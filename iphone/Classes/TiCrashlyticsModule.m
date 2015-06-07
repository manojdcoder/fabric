/**
 * crashlytics
 *
 * Created by Manoj Kumar
 * Copyright (c) 2015 Your Company. All rights reserved.
 */

#import "TiCrashlyticsModule.h"
#import "TiBase.h"
#import "TiHost.h"
#import "TiUtils.h"
#import "Fabric/Fabric.h"
#import "Crashlytics/Crashlytics.h"

@implementation TiCrashlyticsModule

#pragma mark Internal

// this is generated for your module, please do not change it
-(id)moduleGUID
{
	return @"a77fedda-4ecf-4103-b6e2-00af79baab5a";
}

// this is generated for your module, please do not change it
-(NSString*)moduleId
{
	return @"ti.crashlytics";
}

#pragma mark Lifecycle

-(void)startup
{
	// this method is called when the module is first loaded
	// you *must* call the superclass
	[super startup];

	NSLog(@"[INFO] %@ loaded",self);
}

-(void)shutdown:(id)sender
{
	// this method is called when the module is being unloaded
	// typically this is during shutdown. make sure you don't do too
	// much processing here or the app will be quit forceably

	// you *must* call the superclass
	[super shutdown:sender];
}

#pragma mark Cleanup

-(void)dealloc
{
	// release any resources that have been retained by the module
	[super dealloc];
}

#pragma mark Internal Memory Management

-(void)didReceiveMemoryWarning:(NSNotification*)notification
{
	// optionally release any resources that can be dynamically
	// reloaded once memory is available - such as caches
	[super didReceiveMemoryWarning:notification];
}

#pragma Public APIs

-(void)init:(id)args
{
    if([args count] == 0) return;
    NSString *apiKey = nil;
    ENSURE_ARG_AT_INDEX(apiKey, args, 0, NSString);
    [Crashlytics startWithAPIKey:apiKey];
}

-(NSString*)version
{
    return [[Crashlytics sharedInstance] version];
}

-(void)setDebugMode:(id)value
{
    [[Crashlytics sharedInstance] setDebugMode:[TiUtils boolValue:value]];
}

-(void)crash
{
    [[Crashlytics sharedInstance] crash];
}

-(void)leaveBreadcrumb:(id)value
{
    CLSLog(@"%@", [TiUtils stringValue:value]);
}

-(void)setUserIdentifier:(id)value
{
    [[Crashlytics sharedInstance] setUserIdentifier:[TiUtils stringValue:value]];
}

-(void)setUserName:(id)value
{
    [[Crashlytics sharedInstance] setUserName:[TiUtils stringValue:value]];
}

-(void)setUserEmail:(id)value
{
    [[Crashlytics sharedInstance] setUserEmail:[TiUtils stringValue:value]];
}

-(void)setObject:(id)args
{
    if([args count] < 2) return;
    [[Crashlytics sharedInstance] setObjectValue:[args objectAtIndex:1] forKey:[TiUtils stringValue:[args objectAtIndex:0]]];
}

-(void)setInt:(id)args
{
    if([args count] < 2) return;
    [[Crashlytics sharedInstance] setIntValue:[TiUtils intValue:[args objectAtIndex:1]] forKey:[TiUtils stringValue:[args objectAtIndex:0]]];
}

-(void)setFloat:(id)args
{
    if([args count] < 2) return;
    [[Crashlytics sharedInstance] setFloatValue:[TiUtils floatValue:[args objectAtIndex:1]] forKey:[TiUtils stringValue:[args objectAtIndex:0]]];
}

-(void)setBool:(id)args
{
    if([args count] < 2) return;
    [[Crashlytics sharedInstance] setBoolValue:[TiUtils boolValue:[args objectAtIndex:1]] forKey:[TiUtils stringValue:[args objectAtIndex:0]]];
}

@end
