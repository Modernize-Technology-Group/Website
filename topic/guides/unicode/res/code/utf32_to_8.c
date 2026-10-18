#include <stdint.h>

// Converts the UTF-32 code point in "src" to UTF-8 in "dst"
// Assumes that "dst" points to two 16-bit integers allocated in memory properly
// Returns the amount of written UTF-8 code units, 0 on failure.
uint8_t UTF32to8(const uint32_t src, uint8_t dst[4])
{
    // Above 10FFFF (not a valid Unicode code point)
    //   or a surrogate (shouldn't be stored as a regular code point)
    if (src > 0x10FFFF
    ||(src >= 0xD800 && src <= 0xDFFF))
    {
        return 0; // Failure
    }
    // Code point fits in one UTF-8 code unit
    else if (src <= 0x7F)
    {
        dst[0] = (uint8_t)src;
        return 1;
    }
// Note:
// U+uvwxyz in BE (human-writing) binary: 000u vvvv wwww xxxx yyyy zzzz
    // Code point requires two UTF-8 code units
    else if (src <= 0x7FF)
    {
        dst[0] = (uint8_t)(
            ((src >> 6) & 0b00011111) | 0b11000000 // Create 110xxxyy
        );
        dst[1] = (uint8_t)(
            (src & 0b00111111) | 0b10000000 // Create 10yyzzzz
        );
        return 2;
    }
    // Code point requires three UTF-8 code units
    else if (src <= 0xFFFF)
    {
        dst[0] = (uint8_t)(
            ((src >> 12) & 0b00001111) | 0b11100000 // Create 1110wwww
        );
        dst[1] = (uint8_t)(
            ((src >> 6) & 0b00111111) | 0b10000000 // Create 10xxxxyy
        );
        dst[2] = (uint8_t)(
            (src & 0b00111111) | 0b10000000 // Create 10yyzzzz
        );
        return 3;
    }
    // Code point requires four UTF-8 code units
    else //if (src <= 0x10FFFF)
    {
        dst[0] = (uint8_t)(
            ((src >> 18) & 0b00001111) | 0b11110000 // Create 11110uvv
        );
        dst[1] = (uint8_t)(
            ((src >> 12) & 0b00111111) | 0b10000000 // Create 10vvwwww
        );        
        dst[2] = (uint8_t)(
            ((src >> 6) & 0b00111111) | 0b10000000 // Create 10xxxxyy
        );
        dst[3] = (uint8_t)(
            (src & 0b00111111) | 0b10000000 // Create 10yyzzzz
        );
        return 4;
    }
}
