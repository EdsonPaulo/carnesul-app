import { StyleSheet } from 'react-native'
import { metrics, fonts, colors } from '../../constants';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.primaryDark,
        padding: metrics.baseMargin
    },
    iconHeader: {
        color: colors.grayLight,
        width: 40,
        height: 40,
        fontSize: 30
    },
    container: {
        width: '100%',
        padding: metrics.tripleBaseMargin,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.light,
        fontFamily: 'Soviet',
       // textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: colors.light,
        marginHorizontal: 0,
        marginTop: metrics.smallMargin
    },
    bottomText: {
        marginTop: metrics.smallMargin,
        alignSelf: 'center', 
        fontSize: fonts.input,
        color: colors.grayLight, 
        textAlign: 'center' 
    },
    copyrightText: {
        fontSize: fonts.regular, 
        color: colors.grayMedium,
        letterSpacing: 1.4,
        bottom: 10,
        textAlign: 'center'
    }
})

export default styles;
