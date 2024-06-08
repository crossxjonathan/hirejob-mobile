import { StyleSheet } from "react-native";

export default StyleSheet.create({
    backgroundImage: {
        width: 400,
        height: 800,
        backgroundColor: "#5E50A1",
        zIndex: 1,
        position: "absolute"
    },
    title: {
        textAlign: "center",
        width: 300,
        height: 500,
        paddingLeft: 15,
        paddingTop: 30
    },
    text: {
        fontFamily: "OpenSans-VariableFont_wdth,wght",
        fontSize: 48,
        fontWeight: "bold"
    },
    textsm: {
        fontSize: 25,
        fontWeight: 'bold',
      },
    line: {
        borderWidth: 1,
        width: 125,
        borderColor: "white",
        marginVertical: 20,
        marginHorizontal: 5
    },
})