import argparse
import curses
import os
import shutil
import sys
from random import randint
from src.utils import *

from client import Client
from demo.scrolling_window import Scrolling_window
from src.config import SUPERSET_THRESHOLD
from src.utils import NODES
from src.config import SUPERSET_THRESHOLD

client = Client('/ip4/127.0.0.1/tcp/5001', 1)



def input_int(input_str):
    try:
        if input_str == '':
            return SUPERSET_THRESHOLD
        if not input_str:
            return False
        else:
            return int(input_str)
    except Exception:
        return False


def insert():
    path = input("isert path >>>")
    input_str = input("isert key >>>")
    keyword= input_int(input_str)
    client.add_obj(path, keyword)


def remove():
    obj_hash = input("isert hash >>>")
    input_str = input("isert key >>>")
    keyword= input_int(input_str)
    client.remove_obj(obj_hash, keyword)
 
  


def pin_search():
    #keyword = 1 
    input_str = input("isert key >>>")
    keyword= input_int(input_str)
    if not keyword and keyword != 0:
        return

    while not 0 <= keyword < NODES:
        print("Error: Keyword entered not valid")
        input_str = input("isert key >>>")
        keyword= input_int(input_str)
        if not keyword and keyword != 0:
            return

    res = client.pin_search(keyword, -1)
    print(keyword)



def superset_search():
    input_str = input("isert key >>>")
    keyword= input_int(input_str)
    if not keyword and keyword != 0:
        return
    while not 0 <= keyword < NODES:
        print('Error: Keyword entered not valid')
        input_str = input("isert key >>>")
        keyword= input_int(input_str)
        if not keyword and keyword != 0:
            return
    print('Valid keyword')

    input_tr = input("isert threshold >>>")
    threshold= input_int(input_tr)
    if not threshold:
        return
    while threshold < 1:
        print('Error: Threshold entered not valid')
        input_tr = input("isert threshold >>>")
        threshold= input_int(input_tr)
        if not threshold:
            return
    print('Valid threshold')
    res = client.superset_search(keyword, threshold)

def provaSenzaIPFS():
    keyword = 1
    obj = "qualcosa32" #l'ogetto va cambiato
    if request(create_binary_id(1), INSERT, {'keyword': str(keyword), 'obj': obj, 'hop': str(0)}).text == 'success':
            res = 'REFERENCE ({},{}) ADDED'.format(keyword, 'obj_hash')
            print("fattoooo")
       
    else:
            res = 'REFERENCE ({},{}) ALREADY EXIST'.format(keyword, obj)
            print("err")
    




ans=True
while ans:
    print ("""
    1.INSERT
    2.REMOVE
    3.PIN_SEARCH
    4.SUPERSET_SEARCH
    5.prova funzione senza ipfs
    6. binary
    """)
    ans=input("What would you like to do? ") 
    if ans=="1": 
        insert()
    elif ans=="2":
        remove()
    elif ans=="3":
        pin_search()
    elif ans=="4":
        superset_search()
    elif ans == "5":
        provaSenzaIPFS()
    elif ans == "6":
        print((strToBinary('NPHTQORL9XKP')))
    elif ans !="":
      print("\n Not Valid Choice Try again") 



def strToBinary(s):
    bin_conv = []

    for c in s:
          
        # convert each char to
        # ASCII value
        ascii_val = ord(c)
        # Convert ASCII value to binary
        binary_val = bin(ascii_val)
        bin_conv.append(binary_val[2:])
          
    return (' '.join(bin_conv))


def binaryToDecimal(n):
    return int(n,2)
  


#include <iostream>
#include <functional>
#include <string>
'''
def onebyte_hash(s):
    return hash(s) % 10

'''
import hashlib


def strToInt(codeStr):
    h = int(hashlib.md5(codeStr.encode('utf8')).hexdigest(),16) % 8
    return h

'''
  
# Driver code
if __name__ == '__main__':
    iac3 = "FPHTQORL9XKC"
    iac2 = "LPSQNMJN9QU"
    iac0 = "NPHTQORL9XK"
    iac1 = "nphtqorl9xkp"
    iac4 = "npfffgrl9efe"
    #print(onebyte_hash('NPHTQORL9XKP'))

    print(strToInt(iac0))
    print(strToInt(iac1))
    print(strToInt(iac1))
    print(strToInt(iac2))
    print(strToInt(iac4))
'''
    
    


    




