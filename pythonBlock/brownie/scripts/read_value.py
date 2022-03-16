from brownie import certificate , accounts , config

def readValue():
    simple= certificate[-1]

    print(simple.database(0) )


def main():
    readValue();