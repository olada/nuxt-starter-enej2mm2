export default defineNuxtPlugin((nuxtApp) => { 
    console.log('This is being provisioned...');
    const api = $fetch.create({
      async onResponseError({ response }) {
        if (response.status === 401) {
            console.log('NAVIGATE!');
          await nuxtApp.runWithContext(() => navigateTo('/login'))
        }
      }
    });
  
    // Expose to useNuxtApp().$api
    return {
      provide: {
        api
      }
    }
  })