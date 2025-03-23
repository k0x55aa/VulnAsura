package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/k0x55aa/VulnAsura/auth"
	"github.com/k0x55aa/VulnAsura/utils" // Import the auth package
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func setupDatabase() *gorm.DB {
	dsn := "host=172.18.0.2 user=projectasuras password=projectasuras dbname=asura_db port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	return db
}

func main() {
	// Set up the database connection
	db := setupDatabase()
	// Create the gin router
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"http://127.0.0.1:3000"},         // Replace with your frontend URL
		AllowMethods:  []string{"GET", "POST", "PUT", "DELETE"},  // Allow methods
		AllowHeaders:  []string{"Content-Type", "Authorization"}, // Allow necessary headers
		ExposeHeaders: []string{"Authorization"},                 // Make sure Authorization is exposed to client

		// AllowCredentials: true,
	}))

	// Register authentication routes
	auth.RegisterAuthRoutes(r, db)
	r.GET("/profile", auth.JWTAuthMiddleware(), utils.ProfileHandler)

	// Run the server
	r.Run(":8080")
}
