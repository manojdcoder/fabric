/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2015 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiAnswersModule.h"
#import "Crashlytics/Crashlytics.h"


@implementation TiAnswersModule

-(void)dealloc
{
	[super dealloc];
}

#pragma mark Internal Memory Management

-(void)didReceiveMemoryWarning:(NSNotification*)notification
{
	[super didReceiveMemoryWarning:notification];
}

//Helper method to convert any string that can convert to a numerical value to NSNumber
-(NSMutableDictionary *)stringToNSNumber:(NSMutableDictionary *)dict{

	NSNumberFormatter *nFormatter = [[NSNumberFormatter alloc] init];
	nFormatter.numberStyle = NSNumberFormatterDecimalStyle;
	
	NSArray *keysCopy = [[dict allKeys] copy];
	for (NSString *key in keysCopy) {
		NSNumber *strNumber = [nFormatter numberFromString:[dict valueForKey:key]];
		if(strNumber != nil)//if a number was converted from string then not nil
			[dict setValue:strNumber forKey:key];//<- update dict to number!
	}
	RELEASE_TO_NIL(nFormatter);
	RELEASE_TO_NIL(keysCopy);
	return(dict);
}
//Tested Events ==>

-(void)logCustomEventWithName:(id)args
{
    ENSURE_UI_THREAD(logCustomEventWithName, args);
    ENSURE_SINGLE_ARG(args, NSDictionary);
    
    NSString *name;
    NSMutableDictionary *cAttributes;
    
    ENSURE_ARG_OR_NIL_FOR_KEY(name, args, @"name", NSString);
    ENSURE_ARG_OR_NIL_FOR_KEY(cAttributes, args, @"customAttributes", NSMutableDictionary);
	cAttributes = [self stringToNSNumber:cAttributes];

    [Answers logCustomEventWithName:name customAttributes:cAttributes];
}

-(void)logPurchaseWithPrice:(id)args{

    ENSURE_UI_THREAD(logPurchaseWithPrice, args);
    ENSURE_SINGLE_ARG(args, NSDictionary);
    
    NSString *price, *currency, *itemName, *itemType, *itemId;
    NSMutableDictionary *cAttributes;
    
    ENSURE_ARG_OR_NIL_FOR_KEY(price, args, @"price", NSString);
	ENSURE_ARG_OR_NIL_FOR_KEY(currency, args, @"currency", NSString);
	
	BOOL success = [TiUtils boolValue:@"success" properties:args def:YES];
	
	ENSURE_ARG_OR_NIL_FOR_KEY(itemName, args, @"itemName", NSString);
	ENSURE_ARG_OR_NIL_FOR_KEY(itemType, args, @"itemType", NSString);
	ENSURE_ARG_OR_NIL_FOR_KEY(itemId, args, @"itemId", NSString);
	
    ENSURE_ARG_OR_NIL_FOR_KEY(cAttributes, args, @"customAttributes", NSMutableDictionary);
	cAttributes = [self stringToNSNumber:cAttributes];

	[Answers logPurchaseWithPrice:[NSDecimalNumber decimalNumberWithString:price]
		currency:currency
		success: ((success == YES) ? @YES : @NO)//<= hardcoded use of BOOL variable causes crash..?!?
		itemName:itemName
		itemType:itemType
		itemId:itemId
		customAttributes:cAttributes
	];
}

-(void)logSignUpWithMethod:(id)args{
	
	ENSURE_UI_THREAD(logSignUpWithMethod, args);
    ENSURE_SINGLE_ARG(args, NSDictionary);
    
    NSString *method;
	NSMutableDictionary *cAttributes;
	
	ENSURE_ARG_OR_NIL_FOR_KEY(method, args, @"method", NSString);
	BOOL success = [TiUtils boolValue:@"success" properties:args def:YES];
	ENSURE_ARG_OR_NIL_FOR_KEY(cAttributes, args, @"customAttributes", NSMutableDictionary);

	[Answers logSignUpWithMethod:method
		success: ((success == YES) ? @YES : @NO)//<= hardcoded use of BOOL variable causes crash..?!?
		customAttributes: cAttributes
	];

}

/*
== Notes ==
//CLS_LOG(@"%@", [TiUtils stringValue:value]);

With CLS_LOG, you can leave bread crumbs in your code in the form of logged messages that will give you insight into what is going on in your app leading up to a crash.  These messages are associated with your crash data and are visible in the Crashlytics dashboard if you look at the specific crash itself.
CLS_LOG(@"%@", @"CLS_LOG logSignUpWithMethod");
*/

@end
