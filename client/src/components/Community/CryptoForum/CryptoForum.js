import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import "./CryptoForum.css";
import Layout from "../../Layout"


class CryptoForum extends Component {
    constructor() {
        super();
        this.state = {
            allComments:[],
            comment:{
                placeHolder:"Say something!",
                color:"gray"
            },
            cryptoId:0,
            cryptoName:""
        }
    }
    
    //this function sends new comment information to backend, resets the comment form, then sets returned json into state
    addComment = (event) => {
        event.preventDefault();
        let id, user_id, crypto_id, body, comment_parent_id, token;//prep all the data to send into fetch body
        id = event.target.getAttribute("id");//this id distinguishes commentForm on the bottom with replyForms when you click reply.  this id has nothing to do with ids in the db tables
        if (id==="commentForm"){//if this is commentForm
            comment_parent_id = 0;
        } else {//if this is a replyForm
            comment_parent_id = event.target.getAttribute("data-id");
        }
        // user_id = 1; //hardcoding user for now
        crypto_id = this.state.cryptoId;
        body = event.target.children[0].innerText;//save the comment text into body
        console.log("body");
        console.log(body);
        event.target.children[0].innerText = "";//comment text has to be cleared regardless of commentForm or replyForm
        token = localStorage.getItem('token');
        return fetch("http://localhost:3001/crypto/submit-comment", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({crypto_id, body, comment_parent_id, token})
        }).then(res => res.json()).then(allComments => {
            console.log(allComments);
            
            this.setState({//reset the appearance of the commentForm regardless
                comment:{
                    placeHolder:"Say something!",
                    color:"gray"
                }
            });
            if (id!=="commentForm"){
                let replyForm = document.getElementById(id);
                replyForm.style.display = "none";//hides reply form
            }
            return this.setState(allComments)
        })
    }

    //this function sends id of comment to delete, then sets returned json into state
    deleteComment = (event) => {
        let id, crypto_id;//prep all the data to send into fetch body
        crypto_id = this.state.cryptoId;
        id = event.target.parentElement.parentElement.parentElement.getAttribute("data-id");
        // this id IS same as the id from the crypto_comments table
        return fetch("http://localhost:3001/crypto/delete-comment", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, crypto_id})
        }).then(res => res.json())
        .then(allComments => {
            console.log(allComments);
            return this.setState(allComments)
        })
    }

    //this function displays the replyForm when reply button is clicked, then cursor automatically appears in form
    displayReplyForm = (event) => {
        let id;
        id = event.target.parentElement.parentElement.parentElement.getAttribute("data-id");
        let replyForm = document.getElementById("replyForm"+id);
        replyForm.style.display = "block";
        replyForm.children[0].focus();
    }

    //this function removes placeholder text and changes text color to black when comment area is clicked
    removePlaceholder = () => {
        this.setState({
            comment:{
                placeHolder:"",
                color:"black"
            }
        });
    }

    componentDidMount() {
        let cryptoId = this.props.match.params.crypto_id;
        this.setState({cryptoId})
        return fetch(`http://localhost:3001/forum/${cryptoId}`)
        .then((res) => res.json())
        .then(allComments => {
            console.log(allComments);
            this.setState(allComments)
        })
    }

    render() {
        return (
            <div>
                <Layout/>
                <h1>{this.state.cryptoName}</h1>
                {this.state.allComments.map(parent => 
                    <div className="parentComment" id={"parent"+parent.id} key={"parent"+parent.id} data-id={parent.id} data-parent={true}>
                        {(parent.comment_status==="deleted") && <div className="commentDeleted">
                            <div>{parent.date_commented}</div>
                            <div>comment deleted</div>
                        </div>}
                        {(parent.comment_status==="normal") && <div>
                            <div>{parent.date_commented} - {parent.username}
                                <button onClick={this.deleteComment}>Delete</button>
                                <button onClick={this.displayReplyForm}>Reply</button>
                            </div>
                            <div>{ReactHtmlParser(parent.body)}</div>
                        </div>}
                        {parent.children.map(child => 
                            <div className="childComment" id={"child"+child.id} key={"child"+child.id} data-id={child.id} data-parent={false}>
                                {(child.comment_status==="deleted") && <div className="commentDeleted">
                                    <div>{child.date_commented}</div>
                                    <div>reply deleted</div>
                                </div>}
                                {(child.comment_status==="normal") && <div>
                                    <div>{child.date_commented} - {child.username}
                                        <button onClick={this.deleteComment}>Delete</button>
                                    </div>
                                    <div>{ReactHtmlParser(child.body)}</div>
                                </div>}
                            </div>
                        )}
                        <form className="replyForm" onSubmit={this.addComment} id={"replyForm"+parent.id} data-id={parent.id}>
                            <div className="replyArea" id={"replyArea"+parent.id} name="body" contentEditable="true"></div>
                            <div className="buttonDiv"><button>Submit</button></div>
                        </form>
                    </div>
                )}
                <form onSubmit={this.addComment} id="commentForm">
                    <div id="textarea" className={this.state.comment.color} name="body" contentEditable="true" onClick={this.removePlaceholder}>{this.state.comment.placeHolder}</div>
                    <div className="buttonDiv"><button disabled={this.state.commentPlaceHolder==="Say something!"}>Submit</button></div>
                </form>
            </div>
        );
    }
}

export default CryptoForum;
