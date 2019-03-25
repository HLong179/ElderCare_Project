Map<String, String> contentParams = new HashMap<>();
InputStream is = null;
NetHttpTransport transport = null;
HttpRequest request = null;
HttpResponse resp = null;
HttpHeaders headers = new HttpHeaders();
JSONObject json = null;

    try {
        transport = new NetHttpTransport();
        HttpRequestFactory factory = transport.createRequestFactory();
        request = factory.buildPostRequest(new GenericUrl(url), null);
        contentParams = getContentParameters();
        headers.putAll(getHeaderParameters());
        request.setHeaders(headers);
        request.getUrl().putAll(contentParams);
        resp = request.execute();
        is = resp.getContent();
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        try {
            if (is != null) {
                string = getJSONFromInputStream(is);
                json = new JSONObject(string);
            }
         } catch (Exception e) {
            e.printStackTrace();
        }
    }
    transport.shutdown();

protected Map<String, String> getContentParameters() {
     Map<String, String> m = new HashMap<>();
     m.put("version", "3.0.5");
     m.put("email", userEmail);
     m.put("password", userToken);
     return m;
}

protected Map<String, String> getHeaderParameters() {
     Map<String, String> m = new HashMap<>();
     m.put("Referer", "app:/VenstarCloud.swf");
     return m;
}

protected String getJSONFromInputStream(InputStream is) {
    if (is == null)
        throw new NullPointerException();
    //instantiates a reader with max size
    BufferedReader reader = new BufferedReader(new InputStreamReader(is), 8 * 1024);

    StringBuilder sb = new StringBuilder();

    try {
        //reads the response line by line (and separates by a line-break)
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line + "\n");
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            //closes the inputStream
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    return sb.toString();
}