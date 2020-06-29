import metrics from './metrics';
import colors from './colors';
import fonts from './fonts';
import { StatusBar, Platform } from 'react-native';

const general = {
  background: {
    flex: 1,
    backgroundColor: colors.bgColor,

  //  borderTopWidth: StatusBar.currentHeight,
  //  borderTopColor: colors.primaryDark,
  },
  container: {
    padding: metrics.baseMargin,

  },
  card: {
    borderRadius: metrics.baseRadius,
    padding: metrics.baseMargin,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent:  'center',
    alignItems: 'center',
  }
};  

export default general;