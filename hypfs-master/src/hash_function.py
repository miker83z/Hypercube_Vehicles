import hashlib
HYPERCUBE_SIZE = 6

def strToInt(codeStr):
    h = int(hashlib.md5(codeStr.encode('utf8')).hexdigest(),16) % HYPERCUBE_SIZE
    return h


def get_decimal(bit):
    return int(bit, 2)

def one(bit):
    n = get_decimal(bit)
    return [i for i in range(0, len(bit)) if n & (1 << i)]

def create_binary_id(n):
    binary_id = bin(n)[2:]
    while len(binary_id) < HYPERCUBE_SIZE:
        binary_id = '0' + binary_id
    return binary_id


def binToStr(binstrings):
    result = 0
    for s in binstrings:
        result |= int(s, 2)
    
    result = bin(result)[2:]
    return result

def split_OLC(s):

    res = []
    #elimino il +
    s = s.replace('+', "")
  
    #before +
    for i in range(0,len(s),2):
        a = ['0']*len(s)
        a[i:i+2] = s[i:i+2]
        res.append("".join(a))


    return res 

def final_keyword(keyword):
    res = split_OLC(keyword)
    splitted = []
    for i in range (0, len(res)):
 
        splitted.append(create_binary_id(strToInt(res[i])))
    bin_res = binToStr(splitted)

    while len(bin_res) < HYPERCUBE_SIZE:
        bin_res = '0' + bin_res
    #print(bin_res)
    #dec_res = get_decimal(bin_res )
    #print(dec_res)
    #return bin_res
    print("codifica olc:", bin_res)
    return bin_res


'''

print("final  key",final_keyword('9M539XM5+86'))
print("final  key",final_keyword('9M539XM5+F5'))
print("final  key",final_keyword('8FJJVGGF+9Q'))
'''
print("final  key",strToInt('94GC3PJ7+2W'))





'''

if __name__ == '__main__':

    olc1 = "6P00000000"
    olc2 = "00H5000000"
    olc3 = "00007V0000"
    olc4 = "000000P300"
    olc5 = "00000000PR"

    bit1 = create_binary_id(strToInt(olc1))
    bit2 = create_binary_id(strToInt(olc2))
    bit3 = create_binary_id(strToInt(olc3))
    bit4 = create_binary_id(strToInt(olc4))
    bit5 = create_binary_id(strToInt(olc5))

    print(bit1, bit2, bit3,  bit4, bit5)
    
    
    #print("Bitstring", binToStr([bit1,bit2, bit3,  bit4, bit5]))
    #bitstring =  binToStr([bit1,bit2, bit3,  bit4, bit5])
    #print(get_decimal(bitstring) )


    #print("bitFinale:",binToStr([bit1,bit2, bit3, bit4, bit5]))
    #print("bitFinale:",binToStr([bit1,bit2, bit3, bit4, bit5]))

    #funzione nuova
    res = split_OLC("6PH57VP3+PR")
    splitted = []
    for i in range (0, len(res)):
        #print(res[i])
        splitted.append(create_binary_id(strToInt(res[i])))
    
    bin_res = binToStr(splitted)
    print(bin_res)

    dec_res = get_decimal(bin_res )
    print(dec_res)
  
'''

