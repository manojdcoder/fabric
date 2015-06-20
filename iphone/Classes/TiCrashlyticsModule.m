/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2015 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiCrashlyticsModule.h"
#import "Crashlytics/Crashlytics.h"

@implementation TiCrashlyticsModule

-(void)dealloc
{
	[super dealloc];
}

#pragma mark Internal Memory Management

-(void)didReceiveMemoryWarning:(NSNotification*)notification
{
	[super didReceiveMemoryWarning:notification];
}

-(NSString*)version
{
    return [CrashlyticsKit version];
}

-(void)setDebugMode:(id)value
{
    [CrashlyticsKit setDebugMode:[TiUtils boolValue:value]];
}

-(void)crash:(id)args
{
    [CrashlyticsKit crash];
}

-(void)leaveBreadcrumb:(id)value
{
    CLS_LOG(@"%@", [TiUtils stringValue:value]);
}

-(void)setUserIdentifier:(id)value
{
    [CrashlyticsKit setUserIdentifier:[TiUtils stringValue:value]];
}

-(void)setUserName:(id)value
{
    [CrashlyticsKit setUserName:[TiUtils stringValue:value]];
}

-(void)setUserEmail:(id)value
{
    [CrashlyticsKit setUserEmail:[TiUtils stringValue:value]];
}

-(void)setObject:(id)args
{
    if([args count] < 2) return;
    [CrashlyticsKit setObjectValue:[args objectAtIndex:1] forKey:[TiUtils stringValue:[args objectAtIndex:0]]];
}

-(void)setInt:(id)args
{
    if([args count] < 2) return;
    [CrashlyticsKit setIntValue:[TiUtils intValue:[args objectAtIndex:1]] forKey:[TiUtils stringValue:[args objectAtIndex:0]]];
}

-(void)setFloat:(id)args
{
    if([args count] < 2) return;
    [CrashlyticsKit setFloatValue:[TiUtils floatValue:[args objectAtIndex:1]] forKey:[TiUtils stringValue:[args objectAtIndex:0]]];
}

-(void)setBool:(id)args
{
    if([args count] < 2) return;
    [CrashlyticsKit setBoolValue:[TiUtils boolValue:[args objectAtIndex:1]] forKey:[TiUtils stringValue:[args objectAtIndex:0]]];
}

@end
