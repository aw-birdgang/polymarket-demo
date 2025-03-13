// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MinimalForwarder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyTrustedForwarder
 * @dev 특정 relayer만 Gasless 트랜잭션을 실행할 수 있도록 화이트리스트 기능 추가.
 */
contract MyTrustedForwarder is MinimalForwarder, Ownable {
    mapping(address => bool) private _whitelistedCallers;

    event CallerWhitelisted(address indexed caller, bool status);

    constructor() Ownable(msg.sender) {
        _whitelistedCallers[msg.sender] = true; // 배포자를 자동으로 화이트리스트에 추가
    }

    function setCallerWhitelist(address caller, bool status) external onlyOwner {
        _whitelistedCallers[caller] = status;
        emit CallerWhitelisted(caller, status);
    }

    function isWhitelisted(address caller) public view returns (bool) {
        return _whitelistedCallers[caller];
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) public payable override returns (bool, bytes memory)
    {
        require(isWhitelisted(msg.sender), "Caller is not whitelisted");
        return super.execute(req, signature);
    }
}
