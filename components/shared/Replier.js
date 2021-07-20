import {useState} from "react";


const Replier = ({isOpen, closeBtn: CloseBtn, onSubmit, replyTo}) => {
  const [reply, setReply] = useState({title: '', content: ''});

  const handleChange = e => {
    const {name, value} = e.target;
    setReply({...reply, [name]: value});
  }

  const resetReplier = () => {
    setReply({title: '', content: ''});
  }

  return (
    <div className={`reply-controls ${isOpen ? 'is-open' : ''}`}>
      <div className="reply-area">
        { replyTo &&
          <div className="reply-to">
            Reply To: <span className="text ml-2">{replyTo}</span>
          </div>
        }
        <div className="fj-editor-input">
          <input
            value={reply.title}
            onChange={handleChange}
            name="title"
            placeholder="Topic title"
            type="text"></input>
        </div>
        <div className="fj-editor">
          <div className="fj-editor-textarea-wrapper">
            <textarea
              value={reply.content}
              onChange={handleChange}
              name="content"
              placeholder="Type here">
            </textarea>
          </div>
          <div className="fj-editor-preview-wrapper">
            <div className="preview">
              <p></p>
            </div>
          </div>
        </div>
        <div className="submit-area">
          <div className="send mr-auto">
            <button
              onClick={() => {
                debugger;
                // onSubmit是可能会失败了，只有成功了才resetReplier，所以直接作为成功地回调比较好
                onSubmit(reply, resetReplier);
              }}
              className="btn btn-main bg-blue py-2 ttu">Reply</button>
            {/*方法一：传入close的方法*/}
            {/*<a*/}
            {/*  className="btn py-2 ttu gray-10"*/}
            {/*  onClick={onClose}>Cancel</a>*/}
            {/* 方法二： 传入close的组件 */}
            <CloseBtn/>
          </div>
          <div>
            <a className="btn py-2 ttu gray-10">hide preview</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Replier;