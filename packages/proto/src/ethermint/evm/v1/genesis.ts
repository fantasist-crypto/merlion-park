// @generated by protobuf-ts 2.6.0 with parameter long_type_string
// @generated from protobuf file "ethermint/evm/v1/genesis.proto" (package "ethermint.evm.v1", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { State } from "./evm";
import { Params } from "./evm";
/**
 * GenesisState defines the evm module's genesis state.
 *
 * @generated from protobuf message ethermint.evm.v1.GenesisState
 */
export interface GenesisState {
    /**
     * accounts is an array containing the ethereum genesis accounts.
     *
     * @generated from protobuf field: repeated ethermint.evm.v1.GenesisAccount accounts = 1;
     */
    accounts: GenesisAccount[];
    /**
     * params defines all the parameters of the module.
     *
     * @generated from protobuf field: ethermint.evm.v1.Params params = 2;
     */
    params?: Params;
}
/**
 * GenesisAccount defines an account to be initialized in the genesis state.
 * Its main difference between with Geth's GenesisAccount is that it uses a
 * custom storage type and that it doesn't contain the private key field.
 *
 * @generated from protobuf message ethermint.evm.v1.GenesisAccount
 */
export interface GenesisAccount {
    /**
     * address defines an ethereum hex formated address of an account
     *
     * @generated from protobuf field: string address = 1;
     */
    address: string;
    /**
     * code defines the hex bytes of the account code.
     *
     * @generated from protobuf field: string code = 2;
     */
    code: string;
    /**
     * storage defines the set of state key values for the account.
     *
     * @generated from protobuf field: repeated ethermint.evm.v1.State storage = 3;
     */
    storage: State[];
}
// @generated message type with reflection information, may provide speed optimized methods
class GenesisState$Type extends MessageType<GenesisState> {
    constructor() {
        super("ethermint.evm.v1.GenesisState", [
            { no: 1, name: "accounts", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => GenesisAccount, options: { "gogoproto.nullable": false } },
            { no: 2, name: "params", kind: "message", T: () => Params, options: { "gogoproto.nullable": false } }
        ]);
    }
    create(value?: PartialMessage<GenesisState>): GenesisState {
        const message = { accounts: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GenesisState>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GenesisState): GenesisState {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated ethermint.evm.v1.GenesisAccount accounts */ 1:
                    message.accounts.push(GenesisAccount.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* ethermint.evm.v1.Params params */ 2:
                    message.params = Params.internalBinaryRead(reader, reader.uint32(), options, message.params);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GenesisState, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated ethermint.evm.v1.GenesisAccount accounts = 1; */
        for (let i = 0; i < message.accounts.length; i++)
            GenesisAccount.internalBinaryWrite(message.accounts[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* ethermint.evm.v1.Params params = 2; */
        if (message.params)
            Params.internalBinaryWrite(message.params, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ethermint.evm.v1.GenesisState
 */
export const GenesisState = new GenesisState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GenesisAccount$Type extends MessageType<GenesisAccount> {
    constructor() {
        super("ethermint.evm.v1.GenesisAccount", [
            { no: 1, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "storage", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => State, options: { "gogoproto.nullable": false, "gogoproto.castrepeated": "Storage" } }
        ]);
    }
    create(value?: PartialMessage<GenesisAccount>): GenesisAccount {
        const message = { address: "", code: "", storage: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GenesisAccount>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GenesisAccount): GenesisAccount {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string address */ 1:
                    message.address = reader.string();
                    break;
                case /* string code */ 2:
                    message.code = reader.string();
                    break;
                case /* repeated ethermint.evm.v1.State storage */ 3:
                    message.storage.push(State.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GenesisAccount, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string address = 1; */
        if (message.address !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.address);
        /* string code = 2; */
        if (message.code !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.code);
        /* repeated ethermint.evm.v1.State storage = 3; */
        for (let i = 0; i < message.storage.length; i++)
            State.internalBinaryWrite(message.storage[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ethermint.evm.v1.GenesisAccount
 */
export const GenesisAccount = new GenesisAccount$Type();