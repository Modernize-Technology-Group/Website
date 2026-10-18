#include <stdbool.h>
#include <stdint.h>

// Converts the UTF-32 code point in "src" to UTF-16 in "dst"
// Assumes that "dst" points to two 16-bit integers allocated in memory properly
// Returns the amount of written UTF-16 code units, 0 on failure.
uint8_t UTF32to16(const uint32_t src, uint16_t dst[2])
{
    // Above 10FFFF (not a valid Unicode code point)
    //   or a surrogate (shouldn't be stored as a regular code point)
    if (src > 0x10FFFF
    ||(src >= 0xD800 && src <= 0xDFFF))
    {
        return 0; // Failure
    }
    // Code point fits in one UTF-16 code unit
    else if (src <= 0xFFFF)
    {
        dst[0] = (uint16_t)src;
        return 1;
    }
    // Code point requires UTF-16 surrogate pair to fit
    else //if (src <= 0x10FFFF)
    {
        uint32_t interVal = src - 0x10000; // Intermediate value
        // 0x3FF = 10 set bits (0b1111111111)
        dst[0] = 0xD800 + (uint16_t)((interVal >> 10) & 0x3FF); // High surrogate first
        dst[1] = 0xDC00 + (uint16_t)(interVal & 0x3FF); // Low surrogate second
        return 2;
    }
}
