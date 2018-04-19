import Tweet from '../components/Tweet'
import { connect } from 'react-redux'
import * as TweetAPI from '../apis/TweetsAPI'

// class TweetPadrao extends Component {
//    funcaoRemove () {store.dispatch(TweetsAPI.remove())}
//     render() {
//         return (
//             <Tweet removeHandle />
//         )
//     }
// }

const mapDispatchToProps = (dispatch, props) => {
    return {
        removeHandler: () => {
            dispatch(TweetAPI.remove(props.tweetInfo._id))

        },
        handleLike: () => {
            dispatch(TweetAPI.like(props.tweetInfo._id))
        }
    }
}


const TweetPadraoContainer = connect(null, mapDispatchToProps)(Tweet)

export default TweetPadraoContainer
