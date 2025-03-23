package auth

import (
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/SebastiaanKlippert/go-wkhtmltopdf"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Register routes for user registration and login
func RegisterAuthRoutes(r *gin.Engine, db *gorm.DB) {
	// Register new user
	r.POST("/auth/register", func(c *gin.Context) {
		var input struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}
		if err := c.BindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
			return
		}

		user, err := RegisterUser(db, input.Username, input.Password)
		fmt.Println(err)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "User registered successfully", "data": user})
	})

	// Login and generate JWT token
	r.POST("/auth/login", func(c *gin.Context) {
		var input struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}
		if err := c.BindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
			return
		}
		user, token, err := AuthenticateUser(db, input.Username, input.Password)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		c.Header("Authorization", token)

		c.JSON(http.StatusOK, gin.H{"message": "Login successful", "token": token, "user": user})
	})

	r.GET("/protected", JWTAuthMiddleware(), ProtectedEndpoint)
	r.GET("/generate-pdf", generatePDF)
	r.DELETE("/delete/:username", JWTAuthMiddleware(), func(c *gin.Context) {
		username := c.Param("username")
		authenticatedUser, _ := c.Get("username")
		fmt.Println(username, authenticatedUser)

		// Call the DeleteUserByUsername function
		if err := DeleteUserByUsername(db, username); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("User %s deleted successfully", username)})
	})

}
func ParseJWT(tokenStr string) (*jwt.Token, jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return jwtSecretKey, nil
	})

	if err != nil {
		return nil, nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return token, claims, nil
	}
	return nil, nil, errors.New("invalid token")
}

func JWTAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract the token from the Authorization header
		tokenStr := c.GetHeader("Authorization")
		fmt.Println(tokenStr)
		if tokenStr == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing token"})
			c.Abort()
			return
		}

		// Parse the JWT token
		_, claims, err := ParseJWT(tokenStr)
		fmt.Println(claims)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Set the user_id into the context for access in other routes
		// c.Set("user_id", claims["user_id"])

		// Continue to the next handler
		c.Next()
	}
}

func ProtectedEndpoint(c *gin.Context) {
	// Get the user ID from the context
	// userID := c.MustGet("user_id").(float64) // Cast to float64 because JWT claims return it as float64
	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Welcome, user with ID %v", 2),
	})
}

func generatePDF(c *gin.Context) {
	// Get the URL from query parameter
	url := c.DefaultQuery("url", "")
	if url == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "URL parameter is required"})
		return
	}

	pdfg, err := wkhtmltopdf.NewPDFGenerator()
	if err != nil {
		return
	}

	// Set options for the PDF (page size, orientation, etc.)
	pdfg.Dpi.Set(300)
	pdfg.Orientation.Set(wkhtmltopdf.OrientationLandscape)
	pdfg.Grayscale.Set(true)

	// Create a page from the HTML content provided in the query parameter
	page := wkhtmltopdf.NewPage(url)
	page.FooterRight.Set("[page]")
	page.FooterFontSize.Set(10)
	page.Zoom.Set(0.95)
	pdfg.AddPage(page)
	err = pdfg.Create()
	if err != nil {
		log.Printf("Error generating PDF: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate PDF"})
		return
	}
	err = pdfg.WriteFile("./simplesample.pdf")
	if err != nil {
		log.Fatal(err)
	}

	// Set headers for PDF response
	c.Header("Content-Type", "application/pdf")
	c.Header("Content-Disposition", "inline; filename=generated.pdf")

	// Write the PDF as a response
	c.Data(http.StatusOK, "application/pdf", pdfg.Buffer().Bytes())
}
