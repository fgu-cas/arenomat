#include "OpenCV.h"

class VideoCaptureWrap: public node::ObjectWrap {
  public:
      cv::VideoCapture cap;

      static Persistent<FunctionTemplate> constructor;
      static void Init(Handle<Object> target);
      static Handle<Value> New(const Arguments &args);
      
      VideoCaptureWrap(const std::string& filename);
      VideoCaptureWrap(int device, int width, int height); 

      static Handle<Value> Read(const v8::Arguments&);

      //(Optional) For setting width and height of the input video stream 
	  static Handle<Value> SetWidth(const v8::Arguments&);
	  static Handle<Value> SetHeight(const v8::Arguments&);      


      static Handle<Value> GetFrameAt(const v8::Arguments&);

};

