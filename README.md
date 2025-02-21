# Decentralized Renewable Energy Certificate (REC) Trading Platform

A blockchain-based platform for transparent, efficient, and secure trading of Renewable Energy Certificates.

## Overview

The Decentralized REC Trading Platform is a comprehensive solution for managing the entire lifecycle of Renewable Energy Certificates, from issuance to retirement. The platform leverages blockchain technology to ensure transparency, reduce fraud, and streamline the REC trading process.

## Core Components

### REC Issuance Contract
- Validates and records renewable energy production data
- Mints new RECs based on verified production metrics
- Ensures each REC represents a unique unit of renewable energy
- Maintains an immutable record of REC creation and ownership

### Trading Contract
- Facilitates peer-to-peer REC trading
- Manages order books and matching logic
- Handles escrow during transactions
- Provides price discovery mechanisms
- Records complete transaction history

### Compliance Contract
- Tracks renewable energy obligations for participating entities
- Monitors progress towards compliance targets
- Issues automated notifications for upcoming deadlines
- Generates compliance reports and documentation
- Validates REC submissions against regulatory requirements

### Retirement Contract
- Processes permanent REC retirement requests
- Verifies retirement eligibility and ownership
- Records retirement reason and compliance period
- Ensures retired RECs cannot re-enter circulation
- Maintains searchable retirement records

## Getting Started

### Prerequisites
- Node.js (v14.0 or higher)
- Truffle Suite
- MetaMask or similar Web3 wallet
- Access to an Ethereum network (mainnet, testnet, or local)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/rec-trading-platform.git

# Install dependencies
cd rec-trading-platform
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your settings

# Deploy contracts
truffle migrate --network <your-network>
```

### Configuration
1. Set up your environment variables in `.env`:
    - `NETWORK_RPC_URL`: Your Ethereum network RPC endpoint
    - `ADMIN_WALLET_ADDRESS`: Platform administrator wallet
    - `MIN_VALIDATOR_STAKE`: Minimum stake for validators

2. Configure platform parameters in `config.js`:
    - Trading fees
    - Minimum trade sizes
    - Compliance thresholds
    - Retirement rules

## Usage

### Issuing RECs
```javascript
// Example of minting new RECs
await recIssuance.mintCertificates(
    producerId,
    energyAmount,
    productionDate,
    validationProof
);
```

### Trading RECs
```javascript
// Example of creating a sell order
await recTrading.createSellOrder(
    certificateId,
    price,
    quantity,
    expirationTime
);
```

### Managing Compliance
```javascript
// Example of submitting RECs for compliance
await recCompliance.submitForCompliance(
    entityId,
    certificateIds,
    compliancePeriod
);
```

### Retiring RECs
```javascript
// Example of retiring RECs
await recRetirement.retireCertificates(
    certificateIds,
    retirementReason,
    beneficiary
);
```

## Security

The platform implements multiple security measures:
- Multi-signature requirements for critical operations
- Time-locked transactions for large trades
- Automated audit trails
- Role-based access control
- Real-time monitoring and alerts

## Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test test/trading.test.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support

For technical support or questions:
- Create an issue in the GitHub repository
- Contact our support team at support@rec-platform.com
- Join our Discord community

## Acknowledgments

- Energy Web Foundation for REC standards
- OpenZeppelin for smart contract libraries
- Ethereum community for developer tools
