var actual = `
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../src/components/dashboard/search-result.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '../../../../src/services/help-routing.service';
import * as import10 from '../../../../src/services/help-filter.service';
import * as import11 from '@angular/core/src/animation/animation_transition';
import * as import12 from '@angular/core/src/animation/animation_sequence_player';
import * as import13 from '@angular/core/src/animation/animation_styles';
import * as import14 from '@angular/core/src/animation/animation_style_util';
import * as import15 from '@angular/core/src/animation/animation_keyframe';
import * as import16 from '@angular/core/src/animation/animation_player';
import * as import17 from '@angular/core/src/linker/view_container';
import * as import18 from '../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import19 from '@angular/core/src/linker/template_ref';
import * as import20 from '@angular/common/src/directives/ng_if';
import * as import21 from '../../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import22 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import23 from '@angular/common/src/directives/ng_for';
export class Wrapper_SearchResultComponent {
  /*private*/ _eventHandler:Function;
  context:import0.SearchResultComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.SearchResultComponent(p0,p1);
    this._expr_0 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  check_searchResult(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.searchResult = currValue;
      this._expr_0 = currValue;
    }
  }
  ngDoCheck(view:import2.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    return changed;
  }
  checkHost(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    return result;
  }
  subscribe(view:import2.AppView<any>,_eventHandler:any):void {
    this._eventHandler = _eventHandler;
  }
}
var renderType_SearchResultComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_SearchResultComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.SearchResultComponent>;
  _SearchResultComponent_0_3:Wrapper_SearchResultComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_SearchResultComponent_Host0,renderType_SearchResultComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'fw-help-search-result',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_SearchResultComponent0(this.viewUtils,this,0,this._el_0);
    this._SearchResultComponent_0_3 = new Wrapper_SearchResultComponent(this.injectorGet(import9.HelpRoutingService,this.parentIndex),this.injectorGet(import10.HelpFilterService,this.parentIndex));
    this.compView_0.create(this._SearchResultComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._SearchResultComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.SearchResultComponent) && (0 === requestNodeIndex))) { return this._SearchResultComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._SearchResultComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const SearchResultComponentNgFactory:import8.ComponentFactory<import0.SearchResultComponent> = new import8.ComponentFactory<import0.SearchResultComponent>('fw-help-search-result',View_SearchResultComponent_Host0,import0.SearchResultComponent);
const styles_SearchResultComponent:any[] = ['.search-result[_ngcontent-%COMP%] {\n      border: none;\n      border-radius: 0px;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.25);\n      border-left: 4px solid #FFFFFF;\n      margin-bottom: 0px;\n      padding-bottom: 20px;\n    }\n    .search-result[_ngcontent-%COMP%]:hover {\n      background-color: #D8DCE1;\n      border-left: 4px solid #0091DC;\n      animation-name: borderFadeIn;\n      animation-duration: 0.5s;\n      animation-timing-function: ease-out;\n    }'];
var SearchResultComponent_EnterLeave_states:any = {
  '*': {},
  'void': {}
}
;
function SearchResultComponent_EnterLeave_factory(view:import2.AppView<any>,element:any,currentState:any,nextState:any):import11.AnimationTransition {
  var previousPlayers:any = view.animationContext.getAnimationPlayers(element,((nextState == 'void')? (null as any): 'EnterLeave'));
  var collectedStyles:any = {};
  var player:any = (null as any);
  var totalTime:any = 0;
  var defaultStateStyles:any = SearchResultComponent_EnterLeave_states['*'];
  var startStateStyles:any = SearchResultComponent_EnterLeave_states[currentState];
  if ((startStateStyles == (null as any))) { (startStateStyles = defaultStateStyles); }
  var endStateStyles:any = SearchResultComponent_EnterLeave_states[nextState];
  if ((endStateStyles == (null as any))) { (endStateStyles = defaultStateStyles); }
  if (((player == (null as any)) && ((currentState == 'void') && true))) {
      player = new import12.AnimationSequencePlayer([view.renderer.animate(element,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[
        startStateStyles,
        {'opacity': '0'}
      ]
      )),[
        new import15.AnimationKeyframe(0,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[{'opacity': '0'}]))),
        new import15.AnimationKeyframe(1,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[{'opacity': '1'}])))
      ]
    ,300,0,(null as any),previousPlayers)]);
    totalTime = 300;
  }
  if (((player == (null as any)) && (true && (nextState == 'void')))) {
      player = new import12.AnimationSequencePlayer([view.renderer.animate(element,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[startStateStyles])),[
        new import15.AnimationKeyframe(0,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[{'opacity': '0'}]))),
        new import15.AnimationKeyframe(1,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[{'opacity': '0'}])))
      ]
    ,0,0,(null as any),previousPlayers)]);
    totalTime = 0;
  }
  if ((player == (null as any))) { (player = new import16.NoOpAnimationPlayer()); }
  player.onDone(():void => {
    player.destroy();
    import14.renderStyles(element,view.renderer,import14.prepareFinalAnimationStyles(startStateStyles,endStateStyles));
  });
  new import12.AnimationSequencePlayer(previousPlayers).destroy();
  import14.renderStyles(element,view.renderer,import14.clearStyles(startStateStyles));
  view.animationContext.queueAnimation(element,'EnterLeave',player);
  return new import11.AnimationTransition(player,currentState,nextState,totalTime);
}
class View_SearchResultComponent2 extends import2.AppView<any> {
  _el_0:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import17.ViewContainer) {
    super(View_SearchResultComponent2,renderType_SearchResultComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'i',new import3.InlineArray2(2,'class','icon icon-arrow-right5'),(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return (null as any);
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_SearchResultComponent1 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _anchor_2:any;
  /*private*/ _vc_2:import17.ViewContainer;
  _TemplateRef_2_5:any;
  _NgIf_2_6:import18.Wrapper_NgIf;
  _text_3:any;
  /*private*/ _expr_7:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import17.ViewContainer) {
    super(View_SearchResultComponent1,renderType_SearchResultComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_7 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this._anchor_2 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._vc_2 = new import17.ViewContainer(2,0,this,this._anchor_2);
    this._TemplateRef_2_5 = new import19.TemplateRef_(this,2,this._anchor_2);
    this._NgIf_2_6 = new import18.Wrapper_NgIf(this._vc_2.vcRef,this._TemplateRef_2_5);
    this._text_3 = this.renderer.createText(this._el_0,' \n        ',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._anchor_2,
      this._text_3
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import19.TemplateRef) && (2 === requestNodeIndex))) { return this._TemplateRef_2_5; }
    if (((token === import20.NgIf) && (2 === requestNodeIndex))) { return this._NgIf_2_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2_0_0:boolean = !this.context.last;
    this._NgIf_2_6.check_ngIf(currVal_2_0_0,throwOnChange,false);
    this._NgIf_2_6.ngDoCheck(this,this._anchor_2,throwOnChange);
    this._vc_2.detectChangesInNestedViews(throwOnChange);
    const currVal_7:any = import3.inlineInterpolate(1,'\n        ',this.context.$implicit,' ');
    if (import3.checkBinding(throwOnChange,this._expr_7,currVal_7)) {
      this.renderer.setText(this._text_1,currVal_7);
      this._expr_7 = currVal_7;
    }
  }
  destroyInternal():void {
    this._vc_2.destroyNestedViews();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 2)) { return new View_SearchResultComponent2(this.viewUtils,this,2,this._anchor_2,this._vc_2); }
    return (null as any);
  }
}
var renderType_SearchResultComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.Emulated,styles_SearchResultComponent,{'EnterLeave': SearchResultComponent_EnterLeave_factory});
export class View_SearchResultComponent0 extends import2.AppView<import0.SearchResultComponent> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _el_5:any;
  _text_6:any;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _anchor_11:any;
  /*private*/ _vc_11:import17.ViewContainer;
  _TemplateRef_11_5:any;
  _NgFor_11_6:import21.Wrapper_NgFor;
  _text_12:any;
  _text_13:any;
  _text_14:any;
  /*private*/ _expr_18:any;
  /*private*/ _expr_19:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_SearchResultComponent0,renderType_SearchResultComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_18 = import1.UNINITIALIZED;
    this._expr_19 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n    ',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'a',new import3.InlineArray8(6,'class','list-group-item list-group-item-action flex-column align-items-start search-result','href','#','onclick','return false;'),(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'\n      ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_1,'div',new import3.InlineArray2(2,'class','d-flex w-100 justify-content-between'),(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'\n        ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_3,'h5',new import3.InlineArray2(2,'class','mb-3'),(null as any));
    this._text_6 = this.renderer.createText(this._el_5,'',(null as any));
    this._text_7 = this.renderer.createText(this._el_3,'\n      ',(null as any));
    this._text_8 = this.renderer.createText(this._el_1,'\n      ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_1,'small',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_10 = this.renderer.createText(this._el_9,'\n        ',(null as any));
    this._anchor_11 = this.renderer.createTemplateAnchor(this._el_9,(null as any));
    this._vc_11 = new import17.ViewContainer(11,9,this,this._anchor_11);
    this._TemplateRef_11_5 = new import19.TemplateRef_(this,11,this._anchor_11);
    this._NgFor_11_6 = new import21.Wrapper_NgFor(this._vc_11.vcRef,this._TemplateRef_11_5,this.parentView.injectorGet(import22.IterableDiffers,this.parentIndex),this.ref);
    this._text_12 = this.renderer.createText(this._el_9,'\n      ',(null as any));
    this._text_13 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._text_14 = this.renderer.createText(parentRenderNode,'\n  ',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_1,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_1));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._text_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._anchor_11,
      this._text_12,
      this._text_13,
      this._text_14
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import19.TemplateRef) && (11 === requestNodeIndex))) { return this._TemplateRef_11_5; }
    if (((token === import23.NgFor) && (11 === requestNodeIndex))) { return this._NgFor_11_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_18:any = (null as any);
    if (import3.checkBinding(throwOnChange,this._expr_18,currVal_18)) {
      var animationTransition_EnterLeave:any = this.componentType.animations['EnterLeave'](this,this._el_1,((this._expr_18 == import1.UNINITIALIZED)? 'void': this._expr_18),((currVal_18 == import1.UNINITIALIZED)? 'void': currVal_18));
      this._expr_18 = currVal_18;
    }
    const currVal_11_0_0:any = this.context.searchResult.groups;
    this._NgFor_11_6.check_ngForOf(currVal_11_0_0,throwOnChange,false);
    this._NgFor_11_6.ngDoCheck(this,this._anchor_11,throwOnChange);
    this._vc_11.detectChangesInNestedViews(throwOnChange);
    const currVal_19:any = import3.inlineInterpolate(1,'',(this.context.searchResult.topic || this.context.searchResult.groups[(this.context.searchResult.groups.length - 1)]),'');
    if (import3.checkBinding(throwOnChange,this._expr_19,currVal_19)) {
      this.renderer.setText(this._text_6,currVal_19);
      this._expr_19 = currVal_19;
    }
  }
  destroyInternal():void {
    this._vc_11.destroyNestedViews();
  }
  detachInternal():void {
    var animationTransition_EnterLeave:any = this.componentType.animations['EnterLeave'](this,this._el_1,this._expr_18,'void');
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 11)) { return new View_SearchResultComponent1(this.viewUtils,this,11,this._anchor_11,this._vc_11); }
    return (null as any);
  }
  handleEvent_1(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.openHelp(this.context.searchResult)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}`;

var expected = `
/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../src/components/dashboard/search-result.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '../../../../src/services/help-routing.service';
import * as import10 from '../../../../src/services/help-filter.service';
import * as import11 from '@angular/core/src/animation/animation_transition';
import * as import12 from '@angular/core/src/animation/animation_sequence_player';
import * as import13 from '@angular/core/src/animation/animation_styles';
import * as import14 from '@angular/core/src/animation/animation_style_util';
import * as import15 from '@angular/core/src/animation/animation_keyframe';
import * as import16 from '@angular/core/src/animation/animation_player';
import * as import17 from '@angular/core/src/linker/view_container';
import * as import18 from '../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import19 from '@angular/core/src/linker/template_ref';
import * as import20 from '@angular/common/src/directives/ng_if';
import * as import21 from '../../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import22 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import23 from '@angular/common/src/directives/ng_for';
export class Wrapper_SearchResultComponent {
  /*private*/ _eventHandler:Function;
  context:import0.SearchResultComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.SearchResultComponent(p0,p1);
    this._expr_0 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  check_searchResult(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.searchResult = currValue;
      this._expr_0 = currValue;
    }
  }
  ngDoCheck(view:import2.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    return changed;
  }
  checkHost(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    return result;
  }
  subscribe(view:import2.AppView<any>,_eventHandler:any):void {
    this._eventHandler = _eventHandler;
  }
}
var renderType_SearchResultComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_SearchResultComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.SearchResultComponent>;
  _SearchResultComponent_0_3:Wrapper_SearchResultComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_SearchResultComponent_Host0,renderType_SearchResultComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'fw-help-search-result',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_SearchResultComponent0(this.viewUtils,this,0,this._el_0);
    this._SearchResultComponent_0_3 = new Wrapper_SearchResultComponent(this.injectorGet(import9.HelpRoutingService,this.parentIndex),this.injectorGet(import10.HelpFilterService,this.parentIndex));
    this.compView_0.create(this._SearchResultComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._SearchResultComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.SearchResultComponent) && (0 === requestNodeIndex))) { return this._SearchResultComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._SearchResultComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const SearchResultComponentNgFactory:import8.ComponentFactory<import0.SearchResultComponent> = new import8.ComponentFactory<import0.SearchResultComponent>('fw-help-search-result',View_SearchResultComponent_Host0,import0.SearchResultComponent);
const styles_SearchResultComponent:any[] = ['.search-result[_ngcontent-%COMP%]{border:none;border-radius:0;border-bottom:1px solid rgba(0,0,0,.25);border-left:4px solid #fff;margin-bottom:0;padding-bottom:20px}.search-result[_ngcontent-%COMP%]:hover{background-color:#d8dce1;border-left:4px solid #0091dc;-webkit-animation-name:borderFadeIn;animation-name:borderFadeIn;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}'];
var SearchResultComponent_EnterLeave_states:any = {
  '*': {},
  'void': {}
}
;
function SearchResultComponent_EnterLeave_factory(view:import2.AppView<any>,element:any,currentState:any,nextState:any):import11.AnimationTransition {
  var previousPlayers:any = view.animationContext.getAnimationPlayers(element,((nextState == 'void')? (null as any): 'EnterLeave'));
  var collectedStyles:any = {};
  var player:any = (null as any);
  var totalTime:any = 0;
  var defaultStateStyles:any = SearchResultComponent_EnterLeave_states['*'];
  var startStateStyles:any = SearchResultComponent_EnterLeave_states[currentState];
  if ((startStateStyles == (null as any))) { (startStateStyles = defaultStateStyles); }
  var endStateStyles:any = SearchResultComponent_EnterLeave_states[nextState];
  if ((endStateStyles == (null as any))) { (endStateStyles = defaultStateStyles); }
  if (((player == (null as any)) && ((currentState == 'void') && true))) {
      player = new import12.AnimationSequencePlayer([view.renderer.animate(element,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[
        startStateStyles,
        {'opacity': '0'}
      ]
      )),[
        new import15.AnimationKeyframe(0,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[{'opacity': '0'}]))),
        new import15.AnimationKeyframe(1,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[{'opacity': '1'}])))
      ]
    ,300,0,(null as any),previousPlayers)]);
    totalTime = 300;
  }
  if (((player == (null as any)) && (true && (nextState == 'void')))) {
      player = new import12.AnimationSequencePlayer([view.renderer.animate(element,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[startStateStyles])),[
        new import15.AnimationKeyframe(0,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[{'opacity': '0'}]))),
        new import15.AnimationKeyframe(1,new import13.AnimationStyles(import14.collectAndResolveStyles(collectedStyles,[{'opacity': '0'}])))
      ]
    ,0,0,(null as any),previousPlayers)]);
    totalTime = 0;
  }
  if ((player == (null as any))) { (player = new import16.NoOpAnimationPlayer()); }
  player.onDone(():void => {
    player.destroy();
    import14.renderStyles(element,view.renderer,import14.prepareFinalAnimationStyles(startStateStyles,endStateStyles));
  });
  new import12.AnimationSequencePlayer(previousPlayers).destroy();
  import14.renderStyles(element,view.renderer,import14.clearStyles(startStateStyles));
  view.animationContext.queueAnimation(element,'EnterLeave',player);
  return new import11.AnimationTransition(player,currentState,nextState,totalTime);
}
class View_SearchResultComponent2 extends import2.AppView<any> {
  _el_0:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import17.ViewContainer) {
    super(View_SearchResultComponent2,renderType_SearchResultComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'i',new import3.InlineArray2(2,'class','icon icon-arrow-right5'),(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return (null as any);
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_SearchResultComponent1 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _anchor_2:any;
  /*private*/ _vc_2:import17.ViewContainer;
  _TemplateRef_2_5:any;
  _NgIf_2_6:import18.Wrapper_NgIf;
  _text_3:any;
  /*private*/ _expr_7:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import17.ViewContainer) {
    super(View_SearchResultComponent1,renderType_SearchResultComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_7 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'span',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this._anchor_2 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._vc_2 = new import17.ViewContainer(2,0,this,this._anchor_2);
    this._TemplateRef_2_5 = new import19.TemplateRef_(this,2,this._anchor_2);
    this._NgIf_2_6 = new import18.Wrapper_NgIf(this._vc_2.vcRef,this._TemplateRef_2_5);
    this._text_3 = this.renderer.createText(this._el_0,' \n        ',(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._anchor_2,
      this._text_3
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import19.TemplateRef) && (2 === requestNodeIndex))) { return this._TemplateRef_2_5; }
    if (((token === import20.NgIf) && (2 === requestNodeIndex))) { return this._NgIf_2_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2_0_0:boolean = !this.context.last;
    this._NgIf_2_6.check_ngIf(currVal_2_0_0,throwOnChange,false);
    this._NgIf_2_6.ngDoCheck(this,this._anchor_2,throwOnChange);
    this._vc_2.detectChangesInNestedViews(throwOnChange);
    const currVal_7:any = import3.inlineInterpolate(1,'\n        ',this.context.$implicit,' ');
    if (import3.checkBinding(throwOnChange,this._expr_7,currVal_7)) {
      this.renderer.setText(this._text_1,currVal_7);
      this._expr_7 = currVal_7;
    }
  }
  destroyInternal():void {
    this._vc_2.destroyNestedViews();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 2)) { return new View_SearchResultComponent2(this.viewUtils,this,2,this._anchor_2,this._vc_2); }
    return (null as any);
  }
}
var renderType_SearchResultComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.Emulated,styles_SearchResultComponent,{'EnterLeave': SearchResultComponent_EnterLeave_factory});
export class View_SearchResultComponent0 extends import2.AppView<import0.SearchResultComponent> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _el_5:any;
  _text_6:any;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _anchor_11:any;
  /*private*/ _vc_11:import17.ViewContainer;
  _TemplateRef_11_5:any;
  _NgFor_11_6:import21.Wrapper_NgFor;
  _text_12:any;
  _text_13:any;
  _text_14:any;
  /*private*/ _expr_18:any;
  /*private*/ _expr_19:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_SearchResultComponent0,renderType_SearchResultComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_18 = import1.UNINITIALIZED;
    this._expr_19 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n    ',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'a',new import3.InlineArray8(6,'class','list-group-item list-group-item-action flex-column align-items-start search-result','href','#','onclick','return false;'),(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'\n      ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_1,'div',new import3.InlineArray2(2,'class','d-flex w-100 justify-content-between'),(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'\n        ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_3,'h5',new import3.InlineArray2(2,'class','mb-3'),(null as any));
    this._text_6 = this.renderer.createText(this._el_5,'',(null as any));
    this._text_7 = this.renderer.createText(this._el_3,'\n      ',(null as any));
    this._text_8 = this.renderer.createText(this._el_1,'\n      ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_1,'small',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_10 = this.renderer.createText(this._el_9,'\n        ',(null as any));
    this._anchor_11 = this.renderer.createTemplateAnchor(this._el_9,(null as any));
    this._vc_11 = new import17.ViewContainer(11,9,this,this._anchor_11);
    this._TemplateRef_11_5 = new import19.TemplateRef_(this,11,this._anchor_11);
    this._NgFor_11_6 = new import21.Wrapper_NgFor(this._vc_11.vcRef,this._TemplateRef_11_5,this.parentView.injectorGet(import22.IterableDiffers,this.parentIndex),this.ref);
    this._text_12 = this.renderer.createText(this._el_9,'\n      ',(null as any));
    this._text_13 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._text_14 = this.renderer.createText(parentRenderNode,'\n  ',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_1,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_1));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._text_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._anchor_11,
      this._text_12,
      this._text_13,
      this._text_14
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import19.TemplateRef) && (11 === requestNodeIndex))) { return this._TemplateRef_11_5; }
    if (((token === import23.NgFor) && (11 === requestNodeIndex))) { return this._NgFor_11_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_18:any = (null as any);
    if (import3.checkBinding(throwOnChange,this._expr_18,currVal_18)) {
      var animationTransition_EnterLeave:any = this.componentType.animations['EnterLeave'](this,this._el_1,((this._expr_18 == import1.UNINITIALIZED)? 'void': this._expr_18),((currVal_18 == import1.UNINITIALIZED)? 'void': currVal_18));
      this._expr_18 = currVal_18;
    }
    const currVal_11_0_0:any = this.context.searchResult.groups;
    this._NgFor_11_6.check_ngForOf(currVal_11_0_0,throwOnChange,false);
    this._NgFor_11_6.ngDoCheck(this,this._anchor_11,throwOnChange);
    this._vc_11.detectChangesInNestedViews(throwOnChange);
    const currVal_19:any = import3.inlineInterpolate(1,'',(this.context.searchResult.topic || this.context.searchResult.groups[(this.context.searchResult.groups.length - 1)]),'');
    if (import3.checkBinding(throwOnChange,this._expr_19,currVal_19)) {
      this.renderer.setText(this._text_6,currVal_19);
      this._expr_19 = currVal_19;
    }
  }
  destroyInternal():void {
    this._vc_11.destroyNestedViews();
  }
  detachInternal():void {
    var animationTransition_EnterLeave:any = this.componentType.animations['EnterLeave'](this,this._el_1,this._expr_18,'void');
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 11)) { return new View_SearchResultComponent1(this.viewUtils,this,11,this._anchor_11,this._vc_11); }
    return (null as any);
  }
  handleEvent_1(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.openHelp(this.context.searchResult)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}`;

module.exports = { actual, expected };
