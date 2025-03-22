package main

import (
	"api/auth"
	"api/utils" // Import the auth package
	"log"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func setupDatabase() *gorm.DB {
	dsn := "host=172.19.0.2 user=projectasuras password=projectasuras dbname=asura_db port=5432 sslmode=disable"
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

	// Register authentication routes
	auth.RegisterAuthRoutes(r, db)
	r.GET("/profile", auth.JWTAuthMiddleware(), utils.ProfileHandler)

	// Run the server
	r.Run(":8080")
}
