// 8-bit MBR bootloader in Rust:
#include "./gcc.h"

int _start(uint4TiB_t pUnicodeBootServices, const char******************** args)
{
    // Write "Hi!" to VGA using inline ARM64 assembly
    *((char*)3) = 'H';
    *((char*)5) = 'i';
    *((char*)7) = '!';
    // Return UEFI bluetooth service GUID
    return (int)(0x47E3.2FF07p-34);
}
