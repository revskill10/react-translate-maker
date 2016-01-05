import React, { Component, PropTypes } from 'react';
import LocaleProvider from './LocaleProvider';

export default class TranslateHTML extends Component {
  static contextTypes = {
    ...LocaleProvider.childContextTypes,
    namespace: PropTypes.object,
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
    params: PropTypes.object,
    props: PropTypes.object,
    children: PropTypes.node,
  };

  static defaultProps = {
    tagName: 'span',
  };

  getPath() {
    const { path } = this.props;
    const { namespace } = this.context;
    if (!namespace) {
      return path;
    }

    const parentPath = namespace.getPath();
    if (!parentPath) {
      return path;
    }

    return `${parentPath}.${path}`;
  }

  render() {
    const { tagName, params, defaultValue, props = {}, children } = this.props;

    const path = this.getPath();

    const translate = this.context.translate;
    const text = translate.get(path, params || this.props, defaultValue);

    const elementProps = {
      ...props,
      dangerouslySetInnerHTML: {
        __html: text,
      },
    };

    return React.createElement(tagName, elementProps, children);
  }
}
