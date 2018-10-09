package my;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import org.json.JSONObject;

/**
 * Servlet implementation class Auth
 */
@WebServlet("/Auth")
public class Auth extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final String dbAuthUrl = "https://api.dropboxapi.com/oauth2/token";
	private static final String dbClientId = "4eiat35enkuw2ot";
	private static final String dbClientSecret = "t7jebohxqr27g5k";

    /**
     * @see HttpServlet#HttpServlet()
     */
    public Auth() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String code = request.getParameter("code");
		String appUrl = request.getParameter("app_url");

		StringBuilder apiPayloadBuilder = new StringBuilder("code=");
		apiPayloadBuilder.append(URLEncoder.encode(code, "UTF-8"));
		apiPayloadBuilder.append("&grant_type=authorization_code&redirect_uri=");
		apiPayloadBuilder.append(URLEncoder.encode(appUrl, "UTF-8"));
		apiPayloadBuilder.append("&client_id=");
		apiPayloadBuilder.append(URLEncoder.encode(Auth.dbClientId, "UTF-8"));
		apiPayloadBuilder.append("&client_secret=");
		apiPayloadBuilder.append(URLEncoder.encode(Auth.dbClientSecret, "UTF-8"));
		String apiPayload = apiPayloadBuilder.toString();

		URL url = new URL(Auth.dbAuthUrl);
		HttpURLConnection connection = (HttpURLConnection)url.openConnection();
		connection.setDoOutput(true);
		connection.setRequestMethod("POST");
		connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		connection.setRequestProperty("Content-Length", Integer.toString(apiPayload.length()));

		OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream());
		out.write(apiPayload);
		out.flush();

		BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));

		StringBuilder responseBuilder = new StringBuilder();

		String line;
		while ((line = in.readLine()) != null) {
			responseBuilder.append(line);
		}

		in.close();

		connection.disconnect();

		response.getWriter().append(responseBuilder.toString());
	}

}
