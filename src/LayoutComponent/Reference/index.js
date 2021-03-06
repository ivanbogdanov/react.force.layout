/*
 * Copyright (c) 2016, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
 
'use strict';

import React, {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Theme from 'react.force.base.theme';

import styles from './styles';

import Link from './Link';

import Empty from './Empty';


import {SobjContainer} from 'react.force.datacontainer';


module.exports = React.createClass ({
  getDefaultProps(){
    return {
      sobj:{attributes:{}},
      layoutItem:{}
    };
  },
  handlePress(){
    if(this.props.onLayoutTap){
      this.props.onLayoutTap(
        {
          sobj:this.props.parentSobj,
          layoutItem:this.props.layoutItem
        }
      );
    }
  },
  render() {
    const referenceId = this.props.sobj[this.props.layoutItem.details.name];
    const referenceType = this.props.layoutItem.details.referenceTo[this.props.layoutItem.details.referenceTo.length-1];

    console.log('::: referenceType: '+referenceType);
    console.log('::: referenceId: '+referenceId);

    if(!referenceType || !referenceType){
      return <Empty />
    }
    return (
      <SobjContainer
        type={referenceType}
        id={referenceId}
      >
        <Link 
          onPress={this.handlePress}
          onLayoutTap={this.props.onLayoutTap}
          layoutItem={this.props.layoutItem}
          parentSobj={this.props.sobj}
        />
      </SobjContainer>
    );
  }
});
