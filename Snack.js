import React from 'react'
import { View, StyleSheet, Button, TouchableOpacity, Alert, Text } from 'react-native'
import Constants from './Constants'
import { GameEngine } from 'react-native-game-engine'
import Head from './Components/Head'
import Food from './Components/Food'
import { GameLoop } from './Components/GameLoop'
import Tail from './Components/Tail'

export default class Snack extends React.Component {

    constructor(props) {
        super(props)
        this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE
        this.engine = null
        this.state = {
            running: true,
        }
    }
    onEvent = (e) => {
        if (e.type === "game-over") {
            Alert.alert("Game Over")
            this.setState({ running: false })
        }
    }

    reset = () => {
        this.engine.swap(
            {
                head: {
                    position: [0, 0],
                    xSpeed: 0,
                    ySpeed: 1,
                    size: Constants.CELL_SIZE,
                    updateFrequency: 10,
                    nextMoveSize: 10,
                    renderer: <Head />
                },
                food: {
                    position: [this.randomeMinMax(0, Constants.GRID_SIZE - 1), this.randomeMinMax(0, Constants.GRID_SIZE - 1)],
                    size: Constants.CELL_SIZE,
                    renderer: <Food />
                },
                tail: {
                    size: Constants.CELL_SIZE,
                    elements: [],
                    renderer: <Tail />
                }
            }
        )
        this.setState({ running: true })
    }
    randomeMinMax = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    render() {
        return (
            <View style={styles.container}>
                <GameEngine
                    ref={(ref) => { this.engine = ref }}
                    style={{ width: this.boardSize, height: this.boardSize, backgroundColor: '#ffffff', flex: null }}
                    entities={{
                        head: {
                            position: [0, 0],
                            xSpeed: 0,
                            ySpeed: 1,
                            size: Constants.CELL_SIZE,
                            updateFrequency: 10,
                            nextMoveSize: 10,
                            renderer: <Head />
                        },
                        food: {
                            position: [this.randomeMinMax(0, Constants.GRID_SIZE - 1), this.randomeMinMax(0, Constants.GRID_SIZE - 1)],
                            size: Constants.CELL_SIZE,
                            renderer: <Food />
                        },
                        tail: {
                            size: Constants.CELL_SIZE,
                            elements: [],
                            renderer: <Tail />
                        }
                    }}
                    running={this.state.running}
                    onEvent={this.onEvent}
                    systems={[GameLoop]}
                />

                <View style={styles.controller}>
                    <Button style={{ color: 'red', fontSize: 20 }} title="New Game" onPress={this.reset} />
                    <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-up" }) }}>
                        <View style={styles.rect} />
                    </TouchableOpacity>
                    <View style={styles.rowController}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-left" }) }}>
                            <View style={styles.Middlerect} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-right" }) }}>
                            <View style={styles.Middlerect} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-down" }) }}>
                        <View style={styles.rect} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000000",
    },
    controller: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: "blue",
    },
    rowController: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rect: {
        width: 70,
        height: 70,
        padding: 10,
        borderRadius: 35,
        backgroundColor: 'white',
        margin: 10
    },
    Middlerect: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'white',
        marginLeft: 35,
        marginRight: 35
    }

})