/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2015 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
#import "TiModule.h"

@interface TiAnswersModule : TiModule {

}

/**
* Log a custom event to Answers
* @param args
*  name: event name
*  customAttributes: NSMutableDictionary of attributes. Ex: {'demoName' : 'demoValue'}
*/
-(void)logCustomEventWithName:(id)args;

/**
* Log purchase event to Answers
* @param args
*  itemPrice: The item’s amount in the currency specified
*  currency: The ISO4217 currency code
*  success: Was the purchase completed succesfully?
*  itemName: The human-readable name for the item
*  itemType: The category the item falls under
*  itemId: A unique identifier used to track the item
*  customAttributes: NSMutableDictionary of attributes. Ex: {'demoName' : 'demoValue'}
*/
-(void)logPurchaseWithPrice:(id)args;

/**
* Log signup to Answers
* @param args
*  method: The method name used to sign up (ex: 'manual', 'facebook', 'twitter', 'something')
*  success: Boolean flag to signal whether sign up succeeded or failed
*/
-(void)logSignUpWithMethod:(id)args;
@end
