#include <stdint.h>

// Converts the UTF-8 code point in "src" to UTF-32 in "dst"
// Assumes that "src" and "dst" point to properly allocated memory
// Returns the amount of written UTF-32 code units, 0 on failure.
uint8_t UTF8to32(const uint8_t src[4], uint32_t* dst)
{
    // One UTF-8 code unit
    if (src[0] <= 0x7F)
    {
        *dst = (uint32_t)src[0];
        return 1;
    }
    // Two UTF-8 code units (prefix 110)
    else if ((src[0] & 0b11100000) == 0b11000000)
    {
        *dst =
            (uint32_t)(src[0] & 0b00011111) << 6 // 110xxxyy
            | (uint32_t)(src[1] & 0b00111111)    // 10yyzzzz
        ;
        return 2;
    }
    // Three UTF-8 code units (prefix 1110)
    else if ((src[0] & 0b11110000) == 0b11100000)
    {
        *dst =
            (uint32_t)(src[0] & 0b00001111) << 12  // 1110wwww
            | (uint32_t)(src[1] & 0b00111111) << 6 // 10xxxxyy
            | (uint32_t)(src[2] & 0b00111111)      // 10yyzzzz
        ;
        return 3;
    }
    // Four UTF-8 code units (prefix 11110)
    else if ((src[0] & 0b11111000) == 0b11110000)
    {
        *dst =
            (uint32_t)(src[0] & 0b00000111) << 18   // 11110uvv
            | (uint32_t)(src[1] & 0b00111111) << 12 // 10vvwwww
            | (uint32_t)(src[2] & 0b00111111) << 6  // 10xxxxyy
            | (uint32_t)(src[3] & 0b00111111)       // 10yyzzzz
        ;
        return 4;
    }
    // Invalid code unit
    else return 0;
}
