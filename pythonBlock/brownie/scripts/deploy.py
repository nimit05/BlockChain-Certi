from brownie import accounts


def certiFile():
    account = accounts.load("certi")
    # account = accounts[0]
    print("account: ", account)


def main():
    certiFile()
