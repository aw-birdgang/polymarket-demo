const { ethers } = require("ethers");
require("dotenv").config();


/**
 * 실행 주체는 Relayer (트랜잭션 실행을 대납하는 지갑, DEPLOYER_PRIVATE_KEY)
 * Relayer는 서명을 수집하고, 최종적으로 트랜잭션을 MyTrustedForwarder를 통해 실행
 *
 * Relayer (서명 수집 및 실행)
 * DEPLOYER_PRIVATE_KEY (예: 0x43EAAAaE78B6CA996A6f9eCF04d021e8af17db43)
 * Gasless 트랜잭션을 실행하는 주체 (수수료 대납)
 *
 * 사용자 (Signer)
 * DEPLOYER_PRIVATE_KEY
 * 서명을 생성하고 토큰을 보내려는 계정
 *
 * Forwarder Contract
 * TRUSTED_FORWARDER (예: 0x70aA4126624DD0DA8FeFc94aBD8896631a7111E7)
 * 트랜잭션을 릴레이해주는 스마트 컨트랙트
 *
 * 토큰 컨트랙트 (GaslessERC20)
 * GASLESS_ERC20 (예: 0x10A395E6051FCA1Ef8dfDc69f825A64cFB30f99f)
 * 사용자가 전송할 토큰
 *
 * 토큰 수신자
 * 예: 0xC78bdEeAD0D6E5503A91E9a0d4240187342aeF3B
 * 토큰을 받을 대상
 *
 * @returns {Promise<void>}
 */
async function sendGaslessTransaction() {
    if (!process.env.RELAYER_PRIVATE_KEY || process.env.RELAYER_PRIVATE_KEY.length === 0) {
        throw new Error("❌ RELAYER_PRIVATE_KEY is missing in .env file!");
    }

    if (!process.env.DEPLOYER_PRIVATE_KEY || process.env.DEPLOYER_PRIVATE_KEY.length === 0) {
        throw new Error("❌ PRIVATE_KEY is missing or empty in .env file!");
    }

    if (!process.env.INFURA_KEY || process.env.INFURA_KEY.length === 0) {
        throw new Error("❌ SEPOLIA_RPC_URL is missing or empty in .env file!");
    }

    const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`);
    // ✅ Signer (토큰을 보내는 사용자) → 트랜잭션 서명
    const signer = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
    console.log("✅ Signer Address (DEPLOYER):", signer.address);

    // ✅ Relayer (Gas를 대납하는 계정) → 실제 실행
    const relayer = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY, provider);
    console.log("✅ Relayer Address:", relayer.address);


    const forwarderAddress = process.env.TRUSTED_FORWARDER;
    const tokenAddress = process.env.GASLESS_ERC20;
    const recipient = "0xC78bdEeAD0D6E5503A91E9a0d4240187342aeF3B"; // ✅ 실제 받을 주소로 변경
    const amount = ethers.utils.parseEther("1.0"); // ✅ 전송할 토큰 수량 (예: 1 GST)
    // ✅ 환경변수 값 확인 및 유효성 검사 추가
    if (!ethers.utils.isAddress(forwarderAddress)) {
        throw new Error(`❌ Invalid TRUSTED_FORWARDER address: ${forwarderAddress}`);
    }
    if (!ethers.utils.isAddress(tokenAddress)) {
        throw new Error(`❌ Invalid GASLESS_ERC20 address: ${tokenAddress}`);
    }

    // ✅ GaslessERC20 스마트 컨트랙트 연결
    const token = new ethers.Contract(
        tokenAddress,
        [
            "function isTrustedForwarder(address forwarder) public view returns (bool)",
            "function balanceOf(address account) public view returns (uint256)",
            "function transfer(address to, uint256 amount) public returns (bool)",
        ],
        signer
    );

    const forwarderAbi = [
        "function getNonce(address from) public view returns (uint256)",
        "function execute((address,address,uint256,uint256,uint256,bytes) calldata req, bytes calldata signature) public payable returns (bool, bytes memory)",
        "function isWhitelisted(address caller) public view returns (bool)",
        "function setCallerWhitelist(address caller, bool status) external",
        "function owner() public view returns (address)"
    ];
    let forwarder = new ethers.Contract(forwarderAddress, forwarderAbi, relayer);
    // forwarder = forwarder.connect(signer);


    // ✅ Forwarder Owner 확인
    const owner = await forwarder.owner();
    console.log("📌 Forwarder Owner Address:", owner);

    // ✅ 화이트리스트 확인
    const isWhitelistedSigner = await forwarder.isWhitelisted(signer.address);
    console.log("📌 Whitelist Check for Signer:", isWhitelistedSigner);

    let isWhitelistedRelayer = await forwarder.isWhitelisted(forwarderAddress);
    console.log("📌 Whitelist Check for Forwarder:", isWhitelistedRelayer);

    // ✅ Forwarder가 등록된 주소인지 확인
    const isTrusted = await token.isTrustedForwarder(forwarderAddress);
    if (!isTrusted) {
        throw new Error("❌ Forwarder is not trusted!");
    }

    // ✅ 사용자 서명 없이 Gasless 트랜잭션 실행하기 위해 데이터 생성
    const txData = await token.populateTransaction.transfer(recipient, amount);

    // ✅ Forwarder가 화이트리스트에 없으면 등록
    if (!isWhitelistedRelayer && signer.address.toLowerCase() === owner.toLowerCase()) {
        console.log("⚡ Forwarder is not whitelisted. Adding it to whitelist...");
        const tx = await forwarder.setCallerWhitelist(forwarderAddress, true);
        await tx.wait();
        console.log("✅ Forwarder added to whitelist!");

        // 다시 화이트리스트 상태 확인
        isWhitelistedRelayer = await forwarder.isWhitelisted(forwarderAddress);
        console.log("📌 Updated Whitelist Check for Forwarder:", isWhitelistedRelayer);
    }

    if (!isWhitelistedRelayer) {
        console.error("❌ Forwarder is not whitelisted! Abort transaction.");
        return;
    }

    /// ✅ Nonce 가져오기 (Signer 계정 기준)
    const nonce = await forwarder.getNonce(signer.address);
    console.log("📌 Nonce:", nonce.toString());

    const gasLimit = ethers.BigNumber.from(200000);
    const forwardRequest = {
        from: signer.address,
        to: tokenAddress,
        value: "0",
        gas: gasLimit.toString(),
        nonce: nonce.toString(),
        data: txData.data,
    };
    console.log("📌 ForwardRequest:", forwardRequest); // ✅ 값 확인용 로그 추가


    // ✅ EIP-712 TypedData 설정
    const network = await provider.getNetwork();
    const domain = {
        name: "MinimalForwarder",
        version: "1",
        chainId: network.chainId,
        verifyingContract: forwarderAddress,
    };
    console.log("📌 EIP-712 Domain:", domain);

    const types = {
        ForwardRequest: [
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "data", type: "bytes" },
        ],
    };

    // ✅ EIP-712 서명 생성
    const signature = await signer._signTypedData(domain, types, forwardRequest);
    console.log("📌 Signature:", signature);

    // ✅ 서명 검증
    const recoveredAddress = ethers.utils.verifyTypedData(domain, types, forwardRequest, signature);
    console.log("📌 Recovered Address from Signature:", recoveredAddress);
    // ✅ `from` 주소와 서명된 주소가 일치하는지 검증
    if (recoveredAddress.toLowerCase() !== signer.address.toLowerCase()) {
        throw new Error("❌ Signature verification failed! Recovered address does not match signer.");
    }

    console.log("🚀 ForwardRequest to execute:", JSON.stringify(forwardRequest, null, 2));

    try {
        // const populatedTx = await forwarder.populateTransaction.execute(
        //     [
        //         forwardRequest.from,
        //         forwardRequest.to,
        //         forwardRequest.value,
        //         forwardRequest.gas,
        //         forwardRequest.nonce,
        //         forwardRequest.data,
        //     ],
        //     signature
        // );

        console.log("🚀 Executing transaction via Relayer...");
        console.log("📌 ForwardRequest.to:", forwardRequest.to);
        console.log("📌 ForwardRequest.from:", forwardRequest.from);
        console.log("📌 ForwardRequest Data:", forwardRequest.data);
        console.log("📌 GaslessERC20 Address:", tokenAddress);
        console.log("📌 TrustedForwarder Address:", forwarderAddress);
        console.log("📌 Contract ABI:", forwarder.interface.format(ethers.utils.FormatTypes.full));

        const tx = await forwarder.execute(forwardRequest, signature, { gasLimit: forwardRequest.gas });
        await tx.wait();
        console.log("🚀 Gasless transaction sent! Tx Hash:", tx.hash);
    } catch (error) {
        console.error("❌ 트랜잭션 실패:", error.reason || error.message);
    }
}

sendGaslessTransaction().catch(console.error);
