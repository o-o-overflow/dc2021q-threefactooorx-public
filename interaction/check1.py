#!/usr/bin/env python3

import requests
import sys

def main():

    host = sys.argv[1]
    port = int(sys.argv[2])

    r = requests.get(f"http://{host}:{port}")
    print(r.text)

    # conn = netcat.Netcat((host, port))

    # #result = conn.recvuntil(b'awesome chall\n')
    # result = conn.recvuntil(b'who are you?\n')
    # assert b"stderr" not in result

    # to_send = b"adam"

    # conn.sendline(to_send)

    # result = conn.recvuntil(b'you said adam\n')
    # assert b"stderr" not in result

    sys.exit(0)


if __name__ == '__main__':
    main()
    

