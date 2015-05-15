'use strict';

var React = require('react/addons');

var DropboxActions = require('../../actions/DropboxActionCreators');
var Logo = require('../Logo/Logo');
var Loading = require('../Loading/Loading');
require('./DropboxLogin.scss');

var DropboxLogin = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  loginToDropbox() {
    DropboxActions.initLogin();
  },

  proceed() {
    var router = this.context.router;
    var nextPath = router.getCurrentQuery().nextPath;

    if (nextPath) {
      router.replaceWith(nextPath);
    } else {
      router.replaceWith("mockup-list");
    }
  },

  componentDidUpdate() {
    if (!this.props.logged) {
      return;
    }
    
    this.proceed();
  },

  componentDidMount() {
    if (this.props.logged) {
      this.proceed();
    }
  },

  render() {
    return (
      <div className="DropboxLogin">
          {
            this.props.logged === false ?
            // User not logged
            <div>
              <section id="login" className="Hero">
                <Logo type="big"/>
                <p>A demonstration project for UI Kit approach to&nbsp;structure visual components in your project.</p>
                <p>
                  <a onClick={this.loginToDropbox} className="btn btn--dropbox">
                    <i className="fa fa-dropbox"></i>
                    Login with Dropbox
                  </a>
                </p>
              </section>
              <section className="Infoblock">
                <h1>The idea</h1>
                <p>
                  UI Kit is an abstract conception to organize your user interface in modular way. 
                  It strongly relies on documentating design components.
                  This site provides an example on how you may structure your files and create a living styleguide for those.
                </p>
                <p>
                  Check out the following slides for details:
                </p>
                <iframe src="https://www.slideshare.net/slideshow/embed_code/key/w9Do8gDZrk7Dk0" width="476" height="400" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
              </section>
              <section className="Infoblock">
                <h1>Source code</h1>
                <p>This site is available at <a href="https://github.com/ar7em/mockups.github.io">Github repository</a> under MIT License.
                </p>
              </section>
              <section className="Infoblock">
                <h1>Contacts</h1>
                <p>Feel free to contact the author via <a href="mailto:molokov.artem+uikit@gmail.com?Subject=UI%20Kit">email</a> or <a href="https://twitter.com/temium">twitter</a>.
                </p>
              </section>
            </div>:
            // Undefined state (redirect will occure if logged)
            <Loading />
          }
      </div>
    );
  }
});

module.exports = DropboxLogin; 
