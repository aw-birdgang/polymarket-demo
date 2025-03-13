// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MinimalForwarder.sol";

/**
 * @title GaslessERC20
 * @dev Gasless 트랜잭션을 지원하는 ERC20 토큰 컨트랙트.
 */
contract GaslessERC20 is ERC20, ERC20Permit, Ownable {
    MinimalForwarder private _trustedForwarder;

    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    constructor(
        string memory name,
        string memory symbol,
        address forwarder
    ) ERC20(name, symbol) ERC20Permit(name) Ownable(msg.sender) {
        require(forwarder != address(0), "Invalid forwarder address");
        _trustedForwarder = MinimalForwarder(forwarder);
        _mint(msg.sender, 1_000_000 * 10 ** decimals()); // ✅ 초기 공급량 설정
    }

    /**
     * @dev ERC2771Context 스타일의 `_msgSender()` 구현.
     * Forwarder를 통해 호출되었을 경우 원래의 `msg.sender`를 복원함.
     */
    function _msgSender() internal view override returns (address sender) {
        if (msg.data.length >= 20) {
            assembly ("memory-safe") {
                sender := shr(96, calldataload(sub(calldatasize(), 20)))
            }
        } else {
            sender = msg.sender;
        }
    }

    function _msgData() internal pure override returns (bytes calldata) {
        if (msg.data.length >= 20) {
            return msg.data[:msg.data.length - 20];
        } else {
            return msg.data;
        }
    }

    function isTrustedForwarder(address forwarder) public view returns (bool) {
        return forwarder == address(_trustedForwarder);
    }

    /**
     * @dev 새로운 토큰을 발행 (Only Owner).
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev 토큰을 소각 (누구나 가능).
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
}
