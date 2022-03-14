from brownie import accounts, certificate


def certiFile():
    account = accounts.load("certi")
    # account = accounts[0]
    print("account : ", account)

    simple = certificate.deploy({"from": account})
    print(simple)


def main():
    certiFile()
