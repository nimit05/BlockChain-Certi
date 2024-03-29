import json

from web3 import Web3

from solcx import compile_standard, install_solc
import os

from dotenv import load_dotenv

load_dotenv()


with open("./certi.sol", "r") as file:
    certi_file = file.read()

print("Installing...")
install_solc("0.6.0")


# Solidity source code
compiled_sol = compile_standard(
    {
        "language": "Solidity",
        "sources": {"certi.sol": {"content": certi_file}},
        "settings": {
            "outputSelection": {
                "*": {
                    "*": ["abi", "metadata", "evm.bytecode", "evm.bytecode.sourceMap"]
                }
            }
        },
    },
    solc_version="0.6.0",
)

with open("compiled_code.json", "w") as file:
    json.dump(compiled_sol, file)

print("compiled.....")

# get bytecode
bytecode = compiled_sol["contracts"]["certi.sol"]["certificate"]["evm"]["bytecode"][
    "object"
]

# get abi
abi = json.loads(compiled_sol["contracts"]["certi.sol"]["certificate"]["metadata"])[
    "output"
]["abi"]

w3 = Web3(
    Web3.HTTPProvider("https://ropsten.infura.io/v3/2de1de6795684ceca9f8e22c54ac9b3d")
)
chain_id = 3
my_address = "0x3CFbDa3B5A7DfbC65987BC9b765A1904CaCFdA88"
private_key = "93fe5267953817ebef0f0547d34967586c6f3b4e5e23afb73c3974600214b804"

# # Create the contract in Python
SimpleStorage = w3.eth.contract(abi=abi, bytecode=bytecode)
# Get the latest transaction
nonce = w3.eth.getTransactionCount(my_address)
# Submit the transaction that deploys the contract
transaction = SimpleStorage.constructor().buildTransaction(
    {
        "chainId": chain_id,
        "gasPrice": w3.eth.gas_price,
        "from": my_address,
        "nonce": nonce,
    }
)
# Sign the transaction
signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
print("Deploying Contract!")
# Send it!
tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
# Wait for the transaction to be mined, and get the transaction receipt
print("Waiting for transaction to finish...")
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(f"Done! Contract deployed to {tx_receipt.contractAddress}")


# Working with deployed Contracts
simple_storage = w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)

greeting_transaction = simple_storage.functions.addStudent(
    "abhishek", "123", "33", "234", "42", "dcrust", "male"
).buildTransaction(
    {
        "chainId": chain_id,
        "gasPrice": w3.eth.gas_price,
        "from": my_address,
        "nonce": nonce + 1,
    }
)
signed_greeting_txn = w3.eth.account.sign_transaction(
    greeting_transaction, private_key=private_key
)
tx_greeting_hash = w3.eth.send_raw_transaction(signed_greeting_txn.rawTransaction)
# print("Updating stored Value...")
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_greeting_hash)

print(simple_storage.functions.addStudent().send())
