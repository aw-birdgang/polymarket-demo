// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MinimalForwarder {
    struct ForwardRequest {
        address from;
        address to;
        uint256 value;
        uint256 gas;
        uint256 nonce;
        bytes data;
    }

    mapping(address => uint256) private _nonces;

    event Executed(address indexed from, address indexed to, bool success, bytes returnData);

    function getNonce(address from) public view returns (uint256) {
        return _nonces[from];
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) public view returns (bool) {
        bytes32 hash = keccak256(
            abi.encodePacked(req.from, req.to, req.value, req.gas, req.nonce, keccak256(req.data))
        );
        address signer = recover(hash, signature);
        return _nonces[req.from] == req.nonce && signer == req.from;
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) public payable virtual returns (bool, bytes memory) // ✅ virtual 추가
    {
        require(verify(req, signature), "MinimalForwarder: Invalid signature");
        _nonces[req.from]++;

        (bool success, bytes memory returnData) = req.to.call{value: req.value, gas: req.gas}(req.data);
        emit Executed(req.from, req.to, success, returnData);
        return (success, returnData);
    }

    function recover(bytes32 hash, bytes calldata signature) public pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := calldataload(add(signature.offset, 0x20))
            s := calldataload(add(signature.offset, 0x40))
            v := byte(0, calldataload(add(signature.offset, 0x60)))
        }
        return ecrecover(hash, v, r, s);
    }
}
