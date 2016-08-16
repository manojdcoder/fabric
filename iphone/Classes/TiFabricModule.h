/**
 * fabric
 *
 * Created by Manoj Kumar
 * Copyright (c) 2015 Your Company. All rights reserved.
 */

#import "TiModule.h"
#import "TiCrashlyticsModule.h"
#import "TiAnswersModule.h"

@interface TiFabricModule : TiModule
{
    TiCrashlyticsModule *crashlytics;
	TiAnswersModule *answers;
}

@end
