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
  View
} from 'react-native';

import Theme from 'react.force.base.theme';


module.exports = React.createClass ({
  contextTypes: {
    sobj: React.PropTypes.object,
    compactLayout: React.PropTypes.object,
    defaultLayout: React.PropTypes.object
  },
  getDefaultProps(){
    return {
      hideFields:[],
      onSobjRequest:null,
    };
  },
  getQuery() {
    console.log('==d=e=f=a=u=l=t=L=a=y=o=u=t==: ',this.context.defaultLayout);
    console.log('==s=o=b=j==: ',this.context.sobj);

    const queries = [];

    if(this.context.defaultLayout && this.context.defaultLayout.relatedLists){
      this.context.defaultLayout.relatedLists.forEach((relatedList, index)=>{
        console.log('!!=r=e=l=a=t=e=d=L=i=s=t.n=a=m=e=: ',relatedList.columns);
        if(relatedList && relatedList.columns){
          console.log('==r=e=l=a=t=e=d=L=i=s=t=.=c=o=l=u=m=n=s=: ',relatedList.columns);

          const fields = relatedList.columns.map((column)=>{
            return column.name;
          });
          console.log('==FIELDS: ',fields);
          if(fields && fields.length){
            console.log('==F=I=E=L=D=S=: ',fields);
            const q = 'SELECT '+fields.join(',')+ ' FROM '+relatedList.name+' WHERE '+relatedList.field+' = '+this.context.sobj.Id;
            console.log('==q: ',q);
            queries.push(q);
          }
        }
      });
    }
    console.log('==> QUERIES: ',queries);
    return queries;
  },
  getLists() {
    if(this.context.defaultLayout && this.context.defaultLayout.relatedLists){
      return this.context.defaultLayout.relatedLists.map((relatedList, index)=>{
        console.log('==r=e=l=a=t=e=d=L=i=s=t=: ',relatedList);
        return (
          <View key={'RelatedList_'+index}>
            <Text>{relatedList.name}</Text>
          </View>
        );
      });
    }
  },
  render() {
    const queries = this.getQuery();
    console.log('==q=u=e=r=i=e=s==: ',queries);
    return (
      <View>
        {this.getLists()}
      </View>
    )
  }
});
