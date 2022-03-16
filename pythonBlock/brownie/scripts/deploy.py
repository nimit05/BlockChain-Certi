from brownie import accounts, certificate, network ,config
import sys 


def certiFile():
    # account = accounts.load("certi")
    account = getAccounts();
    print("account : ", account)

    simple = certificate.deploy({"from": account})
    print("contract: ", simple)

    print("argument: " ,sys.argv[1])

    # add = simple.addStudent(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6], sys.argv[7],
    #     {"from": account}
    # )

    # add = simple.addStudent("abhi","343", "45", "12", "65", "male", "dcrust",
    #     {"from": account}
    # )

    # add.wait(1);
    
    # print("student: ", add)


def getAccounts():
    if(network.show_active == "development"):
        return accounts[0] 
    else:
        return accounts.add(config["wallets"]["from_key"])    

def main():
    certiFile()
