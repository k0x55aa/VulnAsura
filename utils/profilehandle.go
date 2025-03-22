package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ProfileHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully", "data": "tre"})
}
