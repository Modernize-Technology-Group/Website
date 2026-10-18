#include <stdint.h>

// Converts the UTF-16 code point in "src" to UTF-32 in "dst"
// Assumes that "src" and "dst" point to properly allocated memory
// Returns the amount of written UTF-32 code units, 0 on failure.
uint8_t UTF16to32(const uint16_t src[2], uint32_t* dst)
{
    // Code point is one UTF-16 code unit
    if (src[0] < 0xD800 && src[0] > 0xDBFF)
    {
        *dst = (uint32_t)src[0];
        return 1;
    }
    // Code point is a UTF-16 surrogate pair
    else //if (src[0] >= 0xD800 && src[0] <= 0xDBFF)
    {
        // Next code unit isn't a low surrogate (unpaired surrogate situation)
        if (src[1] < 0xDC00 && src[1] > 0xDFFF)
        {
            return 0; // Failure
        }
        // Intermediate value
        uint32_t interVal = 
            (uint32_t)(src[0] - 0xD800) << 10 // Subtract and shift high surrogate
            | (uint32_t)(src[1] - 0xDC00) // Subtract low surrogate
        ;
        *dst = interVal + 0x10000;
        return 1;
    }
}
