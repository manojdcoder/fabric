/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

/** This is generated, do not edit by hand. **/

#include <jni.h>

#include "Proxy.h"

		namespace ti {
		namespace crashlytics {


class CrashlyticsModule : public titanium::Proxy
{
public:
	explicit CrashlyticsModule(jobject javaObject);

	static void bindProxy(v8::Handle<v8::Object> exports);
	static v8::Handle<v8::FunctionTemplate> getProxyTemplate();
	static void dispose();

	static v8::Persistent<v8::FunctionTemplate> proxyTemplate;
	static jclass javaClass;

private:
	// Methods -----------------------------------------------------------
	static v8::Handle<v8::Value> setFloat(const v8::Arguments&);
	static v8::Handle<v8::Value> setDouble(const v8::Arguments&);
	static v8::Handle<v8::Value> getVersion(const v8::Arguments&);
	static v8::Handle<v8::Value> setUserIdentifier(const v8::Arguments&);
	static v8::Handle<v8::Value> setBool(const v8::Arguments&);
	static v8::Handle<v8::Value> setString(const v8::Arguments&);
	static v8::Handle<v8::Value> leaveBreadcrumb(const v8::Arguments&);
	static v8::Handle<v8::Value> setUserName(const v8::Arguments&);
	static v8::Handle<v8::Value> init(const v8::Arguments&);
	static v8::Handle<v8::Value> setUserEmail(const v8::Arguments&);
	static v8::Handle<v8::Value> setInt(const v8::Arguments&);
	static v8::Handle<v8::Value> logException(const v8::Arguments&);
	static v8::Handle<v8::Value> crash(const v8::Arguments&);

	// Dynamic property accessors ----------------------------------------
	static v8::Handle<v8::Value> getter_version(v8::Local<v8::String> property, const v8::AccessorInfo& info);

};

		} // crashlytics
		} // ti
