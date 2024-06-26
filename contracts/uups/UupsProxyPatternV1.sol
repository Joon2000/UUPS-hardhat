// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {VersionAware} from "../VersionAware.sol";

contract UupsProxyPatternV1 is UUPSUpgradeable, OwnableUpgradeable, VersionAware{
    constructor() {
        _disableInitializers();
    }
    function initialize() external initializer {
        versionAwareContractName = "UUPS Proxy Pattern: V1";
        ///@dev as there is no constructor, we need to initialise the OwnableUpgradeable explicitly
        __Ownable_init(msg.sender);
    }
    
    ///@dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}
    function getContractNameWithVersion() public pure override returns (string memory){
        return "UUPS Proxy Pattern: V1";
    }
}