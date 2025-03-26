import { StyleSheet } from "react-native";

const LayoutStyles = StyleSheet.create({
    dflex: {
        display: "flex"
      },
      alignCenter: {
        alignItems: "center"
      },
      justifyCenter: {
        justifyContent: "center"
      },
      modal: {
        position: 'absolute',
        // paddingHorizontal: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        width: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.36)'
      },
      modelContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 21,
        elevation: 9,
        zIndex: 1,
        backgroundColor: '#fff'
      },
      modalt1: {
        fontSize: 18,
        color: "rgba(255, 89, 99, 1)",
        marginTop: 6
      },
      modalt2: {
        fontSize: 16,
        marginTop: 4,
        textAlign: 'center'
      },
      modalOkButton: {
        paddingVertical: 5,
        paddingHorizontal: 36,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: "#FF5963",
        marginTop: 12
      },
      flexRowDirection: {
        flexDirection: 'row'
      },
      modalOkButtonSelected: {
        paddingVertical: 5,
        paddingHorizontal: 36,
        borderRadius: 32,
        borderWidth: 1,
        marginTop: 12,
        borderColor: "#2650D8",
        backgroundColor: "#2650D8"
      },
      modalOk: {
        color: "#595959"
      },
      modalOkSelected: {
        color: "#fff"
      },
})

export default LayoutStyles;
