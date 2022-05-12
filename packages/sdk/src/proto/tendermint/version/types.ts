// @ts-nocheck
// @generated by protobuf-ts 2.5.0 with parameter long_type_string
// @generated from protobuf file "tendermint/version/types.proto" (package "tendermint.version", syntax proto3)
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
/**
 * App includes the protocol and software version for the application.
 * This information is included in ResponseInfo. The App.Protocol can be
 * updated in ResponseEndBlock.
 *
 * @generated from protobuf messages tendermint.version.App
 */
export interface App {
    /**
     * @generated from protobuf field: uint64 protocol = 1;
     */
    protocol: string;
    /**
     * @generated from protobuf field: string software = 2;
     */
    software: string;
}
/**
 * Consensus captures the consensus rules for processing a block in the
 * blockchain, including all blockchain data structures and the rules of the
 * application's state transition machine.
 *
 * @generated from protobuf messages tendermint.version.Consensus
 */
export interface Consensus {
    /**
     * @generated from protobuf field: uint64 block = 1;
     */
    block: string;
    /**
     * @generated from protobuf field: uint64 app = 2;
     */
    app: string;
}
// @generated messages type with reflection information, may provide speed optimized methods
class App$Type extends MessageType<App> {
    constructor() {
        super("tendermint.version.App", [
            { no: 1, name: "protocol", kind: "scalar", T: 4 /*ScalarType.UINT64*/ },
            { no: 2, name: "software", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<App>): App {
        const message = { protocol: "0", software: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<App>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: App): App {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint64 protocol */ 1:
                    message.protocol = reader.uint64().toString();
                    break;
                case /* string software */ 2:
                    message.software = reader.string();
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
    internalBinaryWrite(message: App, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint64 protocol = 1; */
        if (message.protocol !== "0")
            writer.tag(1, WireType.Varint).uint64(message.protocol);
        /* string software = 2; */
        if (message.software !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.software);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf messages tendermint.version.App
 */
export const App = new App$Type();
// @generated messages type with reflection information, may provide speed optimized methods
class Consensus$Type extends MessageType<Consensus> {
    constructor() {
        super("tendermint.version.Consensus", [
            { no: 1, name: "block", kind: "scalar", T: 4 /*ScalarType.UINT64*/ },
            { no: 2, name: "app", kind: "scalar", T: 4 /*ScalarType.UINT64*/ }
        ], { "gogoproto.equal": true });
    }
    create(value?: PartialMessage<Consensus>): Consensus {
        const message = { block: "0", app: "0" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Consensus>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Consensus): Consensus {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint64 block */ 1:
                    message.block = reader.uint64().toString();
                    break;
                case /* uint64 app */ 2:
                    message.app = reader.uint64().toString();
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
    internalBinaryWrite(message: Consensus, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint64 block = 1; */
        if (message.block !== "0")
            writer.tag(1, WireType.Varint).uint64(message.block);
        /* uint64 app = 2; */
        if (message.app !== "0")
            writer.tag(2, WireType.Varint).uint64(message.app);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf messages tendermint.version.Consensus
 */
export const Consensus = new Consensus$Type();