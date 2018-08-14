import React from 'react'
import '../../style.scss';

export default class extends React.Component {

    render () {
        return (
            <div className="p_developerLearnDetail">
                <h3>What is CAR?</h3>
                <p>CAR means The Component Assembly Runtime (CAR). It is Java with machine code. It is COM with metadata.</p>
                <p>
                    It is a component-oriented programming model and also a programming idea, and it is described by special standards divided in two parts: specification and implementation.
                    The specification part tells how to define the components and how to communicate among components.
                    Following the specification, any language can be used. Thus, CAR can be implemented in many ways.
                    Elastos operating system implements the CAR core services.
                </p>
                <p>
                    CAR components provide service using interface, component interface needs the metadata to describe the component so that other users can know how to use the service.
                    Metadata describe the relationship between services and calls. With this description, calling between different components becomes possible, and members of the long-range, inter-process communication can be properly carried out.
                    The major solved problems by CAR component technology are: component from different sources can interoperate; components upgrade but affect no other component; component is independent of the programming language; transparency of component operating environment
                </p>
                <p>
                    The programming idea with CAR is the essence technology in Elastos, it runs through the entire technology system implementation.
                    In Elastos both the operating system kernel and the component library provided by Elastos platform are implemented using CAR technology.
                    Closely integrated of the operating system kernel with CAR technology runtime environment can provide strong support to Elastos architecture.
                </p>
                <p>
                    By doing this, you're able to use a CAR component to establish communication between a program written in C/C++ and one in HTML5/JS - being able to talk without confirming to one programming language.
                    This leads to convenience for the developer as well as portability.
                    This means that all the DApps can be run on a C++ virtual machine no matter what language the DApp is written in and this also means that there's no need of a bridge like a JNI that is vulnerable to many man-in-the-middle-attacks, virus attacks, etc.
                    In addition, this also lets an elastos DApp use the full capability of the hardware as the program is able to directly talk to the hardware for things like game engines, multimedia codec, etc thereby enabling developers to build true decentralized applications powered by the blockchain technology which is also very secure and scalable at the same time.
                </p>
                <h3>CAR Language</h3>
                <p>This focuses on the syntax of CAR, such as classes, interfaces, methods, parameters, inheritance, constructors, and so on.</p>
                <a href="https://github.com/elastos/Elastos.RT/blob/master/Docs/CAR_Language.md" target="_blank">Source</a>
                <h3>How to write a CAR component?</h3>
                <p>This focuses on the use of the CAR component and how to implement the inheritance relationship as well as the use of some of the macros defined.</p>
                <a href="https://github.com/elastos/Elastos.RT/blob/master/Docs/How_To_Write_A_Car_Component.md" target="_blank">Source</a>
            </div>
        )
    }
}
