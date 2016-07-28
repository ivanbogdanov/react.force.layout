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
} from 'react-native';

import SLDS from 'react.force.base.theme';

import Divider from './Divider';

import LayoutComponent from '../LayoutComponent';

module.exports = React.createClass ({
  getDefaultProps(){
    return {
      sobj:{},
      hasDivider:false,
      layoutItem:{},
      hideFields:[]
    };
  },
  getLayoutComponents(){
    const comps = [];
    if(this.props.layoutItem.layoutComponents){
      this.props.layoutItem.layoutComponents.map((layoutComponent,index)=>{
        if(layoutComponent && layoutComponent.value && this.props.hideFields.indexOf(layoutComponent.value)<0){

          comps.push (
            <LayoutComponent 
              key={'layoutComponent_'+index}
              sobj={this.props.sobj} 
              layoutItem={layoutComponent} 
              onLayoutTap={this.props.onLayoutTap}
              onSobjRequest={this.props.onSobjRequest}/>
          );          

//          comps.push(<Text>{index}</Text>);
        }
      });
    }
    return comps;
  },
  render() {
    const comps = this.getLayoutComponents();
    if(!comps.length){
      return;
    }
    return (
      <Text>
        {this.props.hasDivider?<Divider />:''}
        { comps }
      </Text>
    )
  }
});
