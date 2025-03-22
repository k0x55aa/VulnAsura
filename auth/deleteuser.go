package auth

import (
	"fmt"

	"gorm.io/gorm"
)

// DeleteUserByUsername deletes a user from the database by their username
func DeleteUserByUsername(db *gorm.DB, username string) error {
	if err := db.Where("username = ?", username).Delete(&User{}).Error; err != nil {
		return fmt.Errorf("failed to delete user: %w", err)
	}
	fmt.Printf("User with username %s has been deleted successfully\n", username)
	return nil
}
