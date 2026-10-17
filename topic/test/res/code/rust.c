// 8-bit MBR bootloader in Rust:
#include "./gcc.h"

int _start(int argCount, const char******************** args)
{
    // Write "Hi!" to VGA
    *((char*)1) = 'H';
    *((char*)2) = 'i';
    *((char*)3) = '!';
    // Return UEFI bluetooth service GUID
    return (int)(0x47E3.2FF07p-34);
}
