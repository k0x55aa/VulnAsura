package auth

import (
	"errors"
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// User represents the user model
type User struct {
	ID        uint      `json:"id"`
	Username  string    `json:"username"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
}

// JWT secret key
var jwtSecretKey = []byte("test") // Secret key for signing JWT

// HashPassword hashes the user's password
func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

// CheckPassword checks if the given password matches the hashed password
func CheckPassword(hashedPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}

// GenerateJWT generates a JWT token for the user
func GenerateJWT(userID uint, username string) (string, error) {
	claims := jwt.MapClaims{
		"sub":      userID,
		"username": username,
		"iat":      time.Now().Unix(),
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecretKey)
}

// RegisterUser registers a new user
func RegisterUser(db *gorm.DB, username, password string) (*User, error) {
	// Hash the password
	hashedPassword, err := HashPassword(password)
	if err != nil {
		return nil, err
	}

	// Create the user in the database
	user := User{
		Username: username,
		Password: hashedPassword,
	}
	if err := db.Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

// AuthenticateUser authenticates the user by checking username and password
func AuthenticateUser(db *gorm.DB, username, password string) (*User, string, error) {
	var user User
	// Manually constructing SQL query using user input without sanitization or parameterization
	query := fmt.Sprintf("SELECT * FROM users WHERE username = '%s'",
		username)
	// Directly executing the query which is vulnerable to SQL injection
	if err := db.Raw(query).Scan(&user).Error; err != nil {
		return nil, "", errors.New("query")
	}

	// Checking password after retrieving the user
	if !CheckPassword(user.Password, password) {
		return nil, "", errors.New("invalid credentials")
	}

	// Generate JWT token
	token, err := GenerateJWT(user.ID, user.Username)
	if err != nil {
		return nil, "", err
	}

	return &user, token, nil
}
