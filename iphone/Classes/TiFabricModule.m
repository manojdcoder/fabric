/**
 * fabric
 *
 * Created by Manoj Kumar
 * Copyright (c) 2015 Your Company. All rights reserved.
 */

#import "TiFabricModule.h"
#import "TiBase.h"
#import "TiHost.h"
#import "TiUtils.h"
#import "Fabric/Fabric.h"
#import "Crashlytics/Crashlytics.h"

@implementation TiFabricModule

#pragma mark Internal

// this is generated for your module, please do not change it
-(id)moduleGUID
{
	return @"7fe0637d-73aa-473f-9a83-de32f2b61a43";
}

// this is generated for your module, please do not change it
-(NSString*)moduleId
{
	return @"ti.fabric";
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
    RELEASE_TO_NIL(crashlytics);
	[super dealloc];
}

#pragma mark Internal Memory Management

-(void)didReceiveMemoryWarning:(NSNotification*)notification
{
	// optionally release any resources that can be dynamically
	// reloaded once memory is available - such as caches
    RELEASE_TO_NIL(crashlytics);
	RELEASE_TO_NIL(answers);
	[super didReceiveMemoryWarning:notification];
}

#pragma Public APIs

-(void)init:(id)args
{
    [Fabric with:@[CrashlyticsKit]];
    NSLog(@"[DEBUG] initiated Fabric");
}

-(TiCrashlyticsModule*)Crashlytics
{
    if (crashlytics==nil)
    {
        return [[[TiCrashlyticsModule alloc] _initWithPageContext:[self executionContext]] autorelease];
    }
    return crashlytics;
}

-(TiAnswersModule*)Answers
{
    if (answers==nil)
    {
        return [[[TiAnswersModule alloc] _initWithPageContext:[self executionContext]] autorelease];
    }
    return answers;
}
@end
